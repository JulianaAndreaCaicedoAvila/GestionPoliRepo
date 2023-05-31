using Microsoft.EntityFrameworkCore;

namespace OracleEFCore6
{
	class Program
	{
		//Demonstrates how to get started using Oracle Entity Framework Core 6 
		//Code connects to on-premises Oracle DB or walletless Oracle Autonomous DB

		public class BloggingContext : DbContext
		{
			public DbSet<Blog>? Blogs { get; set; }
			public DbSet<Post>? Posts { get; set; }

			protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
			{
				var conn = "User Id=sirecec_v4;Password=sirecec_v4;Data Source=localhost:1521/ORCLPDB;";
				optionsBuilder.UseOracle(conn);
			}
		}

		public class Blog
		{
			public int BlogId { get; set; }
			public string? Url { get; set; }
			public int? Rating { get; set; }
			public List<Post>? Posts { get; set; }
		}

		public class Post
		{
			public int PostId { get; set; }
			public string? Title { get; set; }
			public string? Content { get; set; }

			public int BlogId { get; set; }
			public Blog? Blog { get; set; }
		}

		static void Main(string[] args)
		{

			using (var db = new BloggingContext())
			{
				var blog = new Blog { Url = "https://blogs.oracle.com" };
				//var blog = new Blog { Url = "https://blogs.oracle.com", Rating = 10 };
				db.Blogs!.Add(blog);
				db.SaveChanges();
			}

			using (var db = new BloggingContext())
			{
				var blogs = db.Blogs;
				foreach (var item in blogs!)
				{
					System.Console.WriteLine(item.Url);
					//Console.WriteLine(item.Url + " has rating " + item.Rating );
				}
			}
			// System.Console.ReadLine();
		}
	}
}
/*
using System;
using Internal;

namespace ConsoleApp
{
	class Program
	{
		static void Main(string[] args)
		{
			Console.WriteLine("Hello, World!");
		}
	}
}
*/