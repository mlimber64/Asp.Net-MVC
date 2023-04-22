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
                         where gradosec.BHABILITADO.Equals(1)
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

        public int guardarDatos(GradoSeccion oGradoSeccion)
        {
            int nroregistros = 0;
            try
            {
                int id = oGradoSeccion.IID;
                if(id == 0)
                {
                    bd.GradoSeccion.InsertOnSubmit(oGradoSeccion);
                    bd.SubmitChanges();
                    nroregistros = 1;
                }
                else
                {
                    GradoSeccion obj = bd.GradoSeccion.Where(p => p.IID.Equals(id)).First();
                    obj.IIDGRADO = oGradoSeccion.IIDGRADO;
                    obj.IIDSECCION = oGradoSeccion.IIDSECCION;
                    bd.SubmitChanges();
                    nroregistros = 1;
                }

            }catch(Exception e)
            {
                nroregistros = 0;
            }
            return nroregistros;

        }

        public int eliminar(int id_Grado)
        {
            int nroregistros = 0;
            try
            {
                GradoSeccion obj = bd.GradoSeccion.Where(p => p.IID.Equals(id_Grado)).First();
                obj.BHABILITADO = 0;
                bd.SubmitChanges();
                nroregistros = 1;
            }catch(Exception e)
            {
                nroregistros = 0;
            }
            return nroregistros;
            
        }
    }

}