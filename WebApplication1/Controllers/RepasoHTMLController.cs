using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class RepasoHTMLController : Controller
    {
        // GET: RepasoHTML
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Tabla()
        {
            return View();
        }
        public ActionResult ComboBox()
        {
            return View();
        }
        public ActionResult TablaJS()
        {
            return View();
        }

        public ActionResult ComboJs()
        {
            return View();
        }

        public JsonResult findAllPersona()
        {
            List<Persona> listaPersona = new List<Persona>
            {
                new Persona {idPersona=1,nombre="Juan"},
                new Persona { idPersona = 2, nombre = "Pedro" }
            };
            return Json(listaPersona,JsonRequestBehavior.AllowGet);
        }

        public  JsonResult llenarComboPersona()
        {
            List<Persona> listaPersona = new List<Persona>
            {
                new Persona {idPersona=1,nombre="Juan"},
                new Persona { idPersona = 2, nombre = "Pedro" }
            };
            return Json(listaPersona, JsonRequestBehavior.AllowGet);
        }
    }
}