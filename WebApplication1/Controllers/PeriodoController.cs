using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class PeriodoController : Controller
    {
        // GET: Periodo

        PruebaDataContext bd = new PruebaDataContext();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult findAllPeriodo()
        {

            var lista = bd.Periodo.Where(p => p.BHABILITADO.Equals(1)).Select(p => new { p.IIDPERIODO, p.NOMBRE, FECHAINICIO = ((DateTime) p.FECHAINICIO).ToShortDateString(), FECHAFIN = ((DateTime)p.FECHAFIN).ToShortDateString()  }).ToList();

            return Json(lista,JsonRequestBehavior.AllowGet);
        }
        public JsonResult buscarPeriodoxNombre(string nombre)
        {

            var lista = bd.Periodo.Where(p => p.BHABILITADO.Equals(1) && p.NOMBRE.Contains(nombre)).Select(p => new { p.IIDPERIODO, p.NOMBRE, FECHAINICIO = ((DateTime)p.FECHAINICIO).ToShortDateString(), FECHAFIN = ((DateTime)p.FECHAFIN).ToShortDateString() }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int eliminar(Periodo oPeriodo)
        {

            int nregistrosAfectados = 0;
            try
            {
                int idPeriodo = oPeriodo.IIDPERIODO;
                Periodo obj = bd.Periodo.Where(p => p.IIDPERIODO.Equals(idPeriodo)).First();
                obj.BHABILITADO = 0;
                bd.SubmitChanges();
                nregistrosAfectados = 1;
            }catch(Exception ex)
            {
                nregistrosAfectados = 0;
            }
            return nregistrosAfectados;
        }

        public JsonResult recuperarPeriodo(int id_periodo)
        {
            
            var lista = bd.Periodo.Where(p => p.IIDPERIODO.Equals(id_periodo)).Select(p => new
            {
                p.IIDPERIODO,
                p.NOMBRE,
                FECHAINICADENA = ((DateTime)p.FECHAINICIO).ToShortDateString(),
                FECHAFINCADENA = ((DateTime)p.FECHAFIN).ToShortDateString()
            });

            return Json(lista,JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(Periodo oPeriodo)
        {
            int nregistrosAfectados = 0;

            try
            {
                int idPeriodo = oPeriodo.IIDPERIODO;

                if(idPeriodo >=1)
                {
                    //editar

                    Periodo obj = bd.Periodo.Where(p => p.IIDPERIODO.Equals(idPeriodo)).First();
                    obj.NOMBRE = oPeriodo.NOMBRE;
                    obj.FECHAINICIO = oPeriodo.FECHAINICIO;
                    obj.FECHAFIN = oPeriodo.FECHAFIN;
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;


                }else
                {
                    //nuevo

                    bd.Periodo.InsertOnSubmit(oPeriodo);
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;

                }
            }catch(Exception ex)
            {
                nregistrosAfectados = 0;
            }

            return nregistrosAfectados;

        }


    }
}