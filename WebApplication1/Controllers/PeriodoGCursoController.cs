using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class PeriodoGCursoController : Controller
    {
        // GET: PeriodoGCurso
        PruebaDataContext db = new PruebaDataContext();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult findAll()
        {
            var lista = (from pgc in db.PeriodoGradoCurso
                         join per in db.Periodo
                         on pgc.IIDPERIODO equals per.IIDPERIODO
                         join grad in db.Grado
                         on pgc.IIDGRADO equals grad.IIDGRADO
                         join cur in db.Curso
                         on pgc.IIDCURSO equals cur.IIDCURSO

                         select new
                         {
                             pgc.IID,
                             NOMBREÉRIODO = per.NOMBRE,
                             NOMBREGRADO = grad.NOMBRE,
                             NOMBRECURSO = cur.NOMBRE
                         }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult recuperarInfo(int id_pgc)
        {
            var lista = db.PeriodoGradoCurso.Where(p => p.IID.Equals(id_pgc)).
                Select(p => new
                {
                    p.IID,
                    p.IIDPERIODO,
                    p.IIDGRADO,
                    p.IIDCURSO
                });

            return Json(lista, JsonRequestBehavior.AllowGet);

        }

        public JsonResult comboPeriodo()
        {
            var lista = db.Periodo.Where(p => p.BHABILITADO.Equals(1)).
                Select(p => new
                {
                    IID = p.IIDPERIODO,
                    p.NOMBRE
                });

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult comboGrado()
        {
            var lista = db.Grado.Where(p => p.BHABILITADO.Equals(1)).
                Select(p => new
                {
                    IID = p.IIDGRADO,
                    p.NOMBRE
                });

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult comboCurso()
        {
            var lista = db.Curso.Where(p => p.BHABILITADO.Equals(1)).
                Select(p => new
                {
                    IID = p.IIDCURSO,
                    p.NOMBRE
                });

            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}