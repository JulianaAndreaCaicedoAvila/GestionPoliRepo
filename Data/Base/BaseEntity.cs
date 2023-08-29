using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Data.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using System.ComponentModel;

namespace ESAP.Sirecec.Data
{
	// 202305271656: DevExtreme.AspNet.Data.dll
	[ModelBinder(typeof(DataSourceLoadOptionsBinder))]
	public class LoadOptions : DataSourceLoadOptionsBase
	{
		public int? Id;
		public string? Table;
		public string? UserData;
	}

	internal class DataSourceLoadOptionsBinder : IModelBinder
	{
		// public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
		// {
		// 	var loadOptions = new LoadOptions();
		// 	DataSourceLoadOptionsParser.Parse(loadOptions, key => bindingContext.ValueProvider.GetValue(key)?.AttemptedValue);
		// 	return loadOptions;
		// }
		public Task BindModelAsync(ModelBindingContext bindingContext)
		{
			var loadOptions = new LoadOptions();
			DataSourceLoadOptionsParser.Parse(loadOptions, key => bindingContext.ValueProvider.GetValue(key).FirstOrDefault());
			bindingContext.Result = ModelBindingResult.Success(loadOptions);
			return Task.CompletedTask;
		}
	}

	public abstract class BaseEntity
	{

		public bool? Activo { get; set; }

		[DefaultValue(1)]
		public int? CreadoPor { get; set; }

		[DefaultValue(typeof(DateTime), "CURRENT_TIMESTAMP")]
		public DateTime? CreadoEl
		{
			get { return CreadoEl ?? DateTime.Now; }
			set => CreadoEl = value;
		}

		[DefaultValue(1)]
		public int? EditadoPor { get; set; }

		[DefaultValue(typeof(DateTime), "CURRENT_TIMESTAMP")]
		public DateTime? EditadoEl
		{
			get { return EditadoEl ?? DateTime.Now; }
			set { EditadoEl = value; }
		}

		public int? Orden { get; set; }
	}
}
