using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Dynamic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace ESAP.Sirecec.Data.Api.Utils
{

	public class JsonDynamicWrapper
	{
		public dynamic D { get; set; }
	}

	public static class Extensions
	{


		public static string FirstLetterToUpper(this string str)
		{
			if (str == null) return null;
			if (str.Length > 1) return char.ToUpper(str[0]) + str.Substring(1);
			return str.ToUpper();
		}

		// 202301190214 https://stackoverflow.com/a/9523388
		public static IEnumerable<TKey> Distinct<T, TKey>(this IEnumerable<T> source, Func<T, TKey> selector)
		{
			return source.GroupBy(selector).Select(x => x.Key);
		}

		public static string GetId(this ClaimsPrincipal principal)
		{
			var userIdClaim = principal.FindFirst(c => c.Type == ClaimTypes.NameIdentifier) ?? principal.FindFirst(c => c.Type == "sub");
			if (userIdClaim != null && !string.IsNullOrEmpty(userIdClaim.Value))
			{
				return userIdClaim.Value;
			}

			return null;
		}

		public static string RemoveDiacritics(this string text)
		{
			// 202003031109: Remove diacritics (accents) from a string in .NET -> https://stackoverflow.com/a/249126
			var normalizedString = text.Normalize(NormalizationForm.FormD);
			var stringBuilder = new StringBuilder();
			foreach (var c in normalizedString)
			{
				var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
				if (unicodeCategory != UnicodeCategory.NonSpacingMark) stringBuilder.Append(c);
			}

			return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
		}

		public static string SafeString(this string s)
		{
			// 202003031104: Replace multiple spaces with a single space -> https://stackoverflow.com/a/206720
			var re = new Regex("[ ]{2,}", RegexOptions.None);
			s = re.Replace(s, " ");
			// 202003031105: Remove words of less than 3 letters -> https://stackoverflow.com/a/6344392
			// var re = new Regex(@"\b\w{1,2}\b");
			// s = re.Replace(s, "");
			s = s.ToLower().Replace(" ", "-");
			return s.RemoveDiacritics();
		}

		public static string ToPascalCase(this string s)
		{
			var words = s.Split(new[] { '-', '_' }, StringSplitOptions.RemoveEmptyEntries)
				 .Select(word => word.Substring(0, 1).ToUpper() + word.Substring(1).ToLower());
			var result = string.Concat(words);
			return result;
		}

		public static string GetMonthName(this int num)
		{
			return CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(num).Capitalize();
		}

		public static bool IsEqualTo(this double? a, double? b, double margin = 0.01)
		{
			return b != null && (a?.IsEqualTo((double)b, margin) ?? false);
		}

		public static bool IsEqualTo(this double a, double b, double margin = 0.01)
		{
			return Math.Abs(a - b) < margin;
		}

		public static string Capitalize(this string input)
		{
			switch (input)
			{
				case null: throw new ArgumentNullException(nameof(input));
				case "": throw new ArgumentException($"{nameof(input)} cannot be empty", nameof(input));
				default: return input.First().ToString().ToUpper() + input.Substring(1);
			}
		}

		public static string Clean(this string str)
		{
			var r = Regex.Replace(str, @"\t|\n|\r", "");
			var regex = new Regex("[ ]{2,}", RegexOptions.None);
			r = regex.Replace(r, " ");
			return r;
		}

		public static string DecodeUrl(this string url)
		{
			string newUrl;
			while ((newUrl = Uri.UnescapeDataString(url)) != url) url = newUrl;
			return newUrl;
		}

		public static object GetInstance(string nameSpace, string tableName)
		{
			return Activator.CreateInstance(GetType(nameSpace, tableName));
		}

		public static Type GetType(string nameSpace, string tableName)
		{
			return Type.GetType(nameSpace + "." + tableName + "," + nameSpace);
		}

		public static IDictionary<string, object> AddProperty(this object obj, string name, object value)
		{
			var dictionary = obj.ToDictionary();
			dictionary.Add(name, value);
			return dictionary;
		}

		public static object CopyValuesTo(this object source, object destiny)
		{
			var ret = new { };
			foreach (var prop in destiny.GetProperties())
			{
				var val = source.GetPropertyValue(prop.Name);
				ret.AddProperty(prop.Name, val);
			}

			return ret;
		}

		public static List<PropertyInfo> GetProperties(this object source)
		{
			return source.GetType().GetProperties().ToList();
		}

		public static object CopyTo(this object source, object destiny, bool copyNulls = true)
		{
			foreach (var prop in destiny.GetProperties())
			{
				var sourceProperty = source.GetProperty(prop.Name);
				if (sourceProperty != null)
				{
					var sourceValue = source.GetPropertyValue(prop.Name);
					if (sourceValue != null || copyNulls) destiny.SetPropertyValue(prop.Name, sourceValue);
				}
			}

			return destiny;
		}

		public static PropertyInfo GetProperty(this object source, string propertyName)
		{
			return source.GetType().GetProperty(propertyName);
		}

		/// <summary>
		///     Gets the property value.
		/// </summary>
		/// <param name="source">The source.</param>
		/// <param name="propertyName">Name of the property.</param>
		/// <returns>System.Object.</returns>
		public static object GetPropertyValue(this object source, string propertyName)
		{
			PropertyInfo prop;
			if (propertyName.Contains(","))
			{
				var arrFinal = new List<string>();
				var arr = propertyName.Split(',');
				foreach (var propName in arr)
				{
					prop = source.GetProperty(propName);
					if (prop != null) arrFinal.Add(prop.GetValue(source, null).ToString());
				}

				return string.Join(" ", arrFinal);
			}

			prop = source.GetProperty(propertyName);
			return prop?.GetValue(source, null);
		}

		/// <summary>
		///     Sets the property value.
		/// </summary>
		/// <param name="source">The source.</param>
		/// <param name="propertyName">Name of the property.</param>
		/// <param name="propertyValue">The property value.</param>
		public static void SetPropertyValue(this object source, string propertyName, object propertyValue)
		{
			var prop = source.GetProperty(propertyName);
			prop.SetValue(source, propertyValue, null);
		}

		public static IDictionary<string, object> ToDictionary(this object obj)
		{
			IDictionary<string, object> result = new Dictionary<string, object>();
			var properties = TypeDescriptor.GetProperties(obj);
			foreach (PropertyDescriptor property in properties) result.Add(property.Name, property.GetValue(obj));
			return result;
		}

		/// <summary>
		///     Filters the specified property name.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="items">The items.</param>
		/// <param name="propName">Name of the property.</param>
		/// <param name="value">The value.</param>
		/// <returns>List&lt;T&gt;.</returns>
		public static List<T> Filter<T>(this List<T> items, string propName, string value)
		{
			if (items.Count <= 0) return null;
			var res = new List<T>();
			foreach (var item in items)
			{
				var propValue = item.GetPropertyValue(propName);
				if (propValue.ToString() == value) res.Add(item);
			}

			return res;
		}

		/// <summary>
		///     Serializa un objeto y obtiene su representación como una cadena JSON
		/// </summary>
		/// <param name="source">El objeto a trabajar</param>
		/// <param name="formatted">Si se debe presentar indentada la cadena de respuesta</param>
		/// <param name="ignoreNulls"></param>
		/// <param name="ignoreAttributes">Lista de atributos a ser ignorados en la serialización</param>
		/// <returns>System.String.</returns>
		// public static string ToJson(this object source,
		// 	 bool formatted = false,
		// 	 bool ignoreNulls = true,
		// 	 List<string> ignoreAttributes = null) {
		// 	// TODO: 201810052144 Implementar el ignorado de propiedades dinámico
		// 	var settings = new JsonSerializerSettings {
		// 		// JSON.NET Error Self referencing loop detected for type
		// 		// https://stackoverflow.com/a/18223985
		// 		ReferenceLoopHandling = ReferenceLoopHandling.Ignore
		// 	};
		// 	settings.Converters.Add(new IsoDateTimeConverter { DateTimeFormat = "yyyy'-'MM'-'dd'T'HH':'mm':'ss" });
		// 	settings.Converters.Add(new BinaryConverter());
		// 	settings.ContractResolver = new JsonContractResolver();

		// 	return WebUtility.HtmlDecode(JsonConvert.SerializeObject(source,
		// 		 formatted ? Formatting.Indented : Formatting.None,
		// 		 settings));
		// }

		// public static JsonResult JsonResult(this object source, bool formatted = false) {
		// 	var json = source.ToJson(formatted);
		// 	return new JsonResult { Data = json };
		// }

		/// <summary>
		///     To the expando.
		///     http://theburningmonk.com/2011/05/idictionarystring-object-to-expandoobject-extension-method/
		/// </summary>
		/// <param name="dictionary">The dictionary.</param>
		/// <returns>ExpandoObject.</returns>
		public static ExpandoObject ToObject(this IDictionary<string, object> dictionary)
		{
			var expando = new ExpandoObject();
			var expandoDic = (IDictionary<string, object>)expando;
			// go through the items in the dictionary and copy over the key value pairs)
			foreach (var kvp in dictionary)
				if (kvp.Value is IDictionary<string, object> value)
				{
					var expandoValue = value.ToObject();
					expandoDic.Add(kvp.Key, expandoValue);
				}
				else if (kvp.Value is ICollection collection)
				{
					// iterate through the collection and convert any strin-object dictionaries
					// along the way into expando objects
					var itemList = new List<object>();
					foreach (var item in collection)
						if (item is IDictionary<string, object> objects)
						{
							var expandoItem = objects.ToObject();
							itemList.Add(expandoItem);
						}
						else
						{
							itemList.Add(item);
						}

					expandoDic.Add(kvp.Key, itemList);
				}
				else
				{
					expandoDic.Add(kvp);
				}

			return expando;
		}

		/// <summary>
		///     Obtiene un objeto dinámico de tipo "ExpandoObject"
		///     http://stackoverflow.com/a/17276999
		/// </summary>
		/// <param name="collection">La colección</param>
		/// <returns>ExpandoObject</returns>
		public static ExpandoObject ToObject(this NameValueCollection collection)
		{
			var dictionary = (IDictionary<string, object>)new ExpandoObject();
			var items = collection.AllKeys.ToDictionary(key => key, value => collection[value]);
			foreach (var item in items) dictionary.Add(item.Key, item.Value);
			return dictionary.ToObject();
		}
	}
}