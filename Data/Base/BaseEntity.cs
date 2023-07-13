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
using Newtonsoft.Json;

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
		// public int Id { get; set; }

		// public DateTime CreadoEl { get; set; } = DateTime.Now;

		// public int? CreadoPor { get; set; } = null;

		// public DateTime? EditadoEl { get; set; } = null;

		// public int? EditadoPor { get; set; } = null;

		public DateTime CreadoEl
		{
			get
			{
				return this.creadoEl ?? DateTime.Now;
			}

			set { this.creadoEl = value; }
		}
		private DateTime? creadoEl = null;
		public DateTime EditadoEl
		{
			get
			{
				return this.editadoEl ?? DateTime.Now;
			}

			set { this.editadoEl = value; }
		}
		private DateTime? editadoEl = null;

		public bool? Activo { get; set; }

		public int? CreadoPor { get; set; }
		public int? EditadoPor { get; set; }

		public int? Orden { get; set; }
	}
}
