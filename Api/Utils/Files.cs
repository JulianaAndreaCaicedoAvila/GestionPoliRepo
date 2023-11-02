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
using ESAP.Sirecec.Data.Model;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace ESAP.Sirecec.Data.Api.Utils
{
	public class Files
	{
		public static string BytesToString(long byteCount)
		{
			string[] suf = { "B", "KB", "MB", "GB", "TB", "PB", "EB" }; //Longs run out around EB
			if (byteCount == 0)
				return "0" + suf[0];
			long bytes = Math.Abs(byteCount);
			int place = Convert.ToInt32(Math.Floor(Math.Log(bytes, 1024)));
			double num = Math.Round(bytes / Math.Pow(1024, place), 1);
			return (Math.Sign(byteCount) * num).ToString() + suf[place];
		}

		public static List<FileModel> GetFiles(string targetDirectory)
		{
			var res = new List<FileModel>();
			var directory = new DirectoryInfo(targetDirectory);
			foreach (var f in directory.GetFiles())
			{
				res.Add(new FileModel()
				{
					Name = f.Name,
					DateModified = f.LastWriteTime,
					Size = BytesToString(f.Length),
					Length = f.Length
				});
			}
			return res;
		}

		// Insert logic for processing found files here.
		public static void ProcessFile(string path)
		{
			Console.WriteLine("Processed file '{0}'.", path);
		}
	}
}