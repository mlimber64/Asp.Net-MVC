using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class GradoSeccionController : Controller
    {
        // GET: GradoSeccion

        PruebaDataContext bd = new PruebaDataContext();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult findAllGradoSeccion()
        {
            var lista = (from gradosec in bd.GradoSeccion
                         join sec in bd.Seccion
                         on gradosec.IIDSECCION equals sec.IIDSECCION
                         join grad in bd.Grado
                         on gradosec.IIDGRADO equals grad.IIDGRADO
                         select new
                         {
                             gradosec.IID,
                             nombreGrado = grad.NOMBRE,
                             nombreSeccion = sec.NOMBRE
                         }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult recuperarInformacion(int id_grado)
        {
            var lista = bd.GradoSeccion.Where(p => p.IID.Equals(id_grado)).Select(p => new
                {
                    p.IID,
                    p.IIDGRADO,
                    p.IIDSECCION
                }
                
                );

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult findAllSeccion()
        {
            var lista = bd.Seccion.Where(p => p.BHABILITADO.Equals(1)).Select(p => new { IID = p.IIDSECCION, p.NOMBRE });
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult findAllGrado()
        {
            var lista = bd.Grado.Where(p => p.BHABILITADO.Equals(1)).Select(p => new { IID = p.IIDGRADO, p.NOMBRE });
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }

}