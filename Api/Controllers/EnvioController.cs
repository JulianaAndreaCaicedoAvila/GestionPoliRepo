using System.Text;
using DevExtreme.AspNet.Data;
using SongStock.Data;
using SongStock.Api.Authorization;
using SongStock.Api.Utils;
using SongStock.Data.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Newtonsoft.Json;
using SongStock.Api.Controllers;
using Microsoft.EntityFrameworkCore;
namespace SongStock.Api.Controllers {
  [@Authorize]
  [ApiController]
  [Route("envio")]
  public class EnvioController : ControllerBase {
    private readonly DataContext _db;
    private readonly IHttpContextAccessor _context;
    public EnvioController(DataContext context, IHttpContextAccessor httpContextAccessor) {
      _db = context;
      _context = httpContextAccessor;
    }

    [HttpPost("ed")] // /api/curso/ed => CREATE - UPDATE
    public ActionResult Edit(Envio item) {
      var u = User;

      // Registro nuevo: CREATE
      if (item.Id == 0) {
        var obj = (Envio)item.CopyTo(new Envio());
        // obj.CreadoPor = GetUserId();
        obj.CreadoEl = DateTime.Now;
        _db.Envio.Add(obj);
        _db.SaveChanges();
        return Ok(obj);
      } else {
        // Registro existente: EDIT
        var current = _db.Envio.First(o => o.Id == item.Id);
        if (current != null) {
          var final = (Envio)item.CopyTo(current);
          // final.EditadoPor = GetUserId();
          final.EditadoEl = DateTime.Now;
          _db.SaveChanges();
          return Ok(final);
        }

        return Ok(item);
      }
    }


    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id) {
      var existe = await _db.Envio.AnyAsync(x => x.Id == id);
      if (!existe) {
        return NotFound();
      }

      _db.Remove(new Envio() { Id = id });
      await _db.SaveChangesAsync();
      return Ok(id);
    }
  }

}
