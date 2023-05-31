using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class GradoSeccionAulaController : Controller
    {
        // GET: GradoSeccionAula
        PruebaDataContext db = new PruebaDataContext();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listar()
        {
            var lista = from tabla in db.GradoSeccionAula
                        join periodo in db.Periodo
                        on tabla.IIDPERIODO equals periodo.IIDPERIODO
                        join gradoseccion in db.GradoSeccion
                        on tabla.IIDGRADOSECCION equals gradoseccion.IID
                        join docente in db.Docente
                        on tabla.IIDDOCENTE equals docente.IIDDOCENTE
                        join curso in db.Curso
                        on tabla.IIDCURSO equals curso.IIDCURSO
                        join grado in db.Grado
                        on gradoseccion.IIDGRADO equals grado.IIDGRADO
                        where tabla.BHABILITADO.Equals(1)
                        select new
                        {
                            tabla.IID,
                            NOMBREPERIODO = periodo.NOMBRE,
                            NOMBREGRADO = grado.NOMBRE,
                            NOMBRECURSO = curso.NOMBRE,
                            NOMBREDOCENTE = docente.NOMBRE + " " + docente.APMATERNO + " " + docente.APMATERNO 
                            
                        };

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarPeriodos()
        {
            var lista = db.Periodo.Where(p => p.BHABILITADO.Equals(1))
                        .Select(p => new
                        {
                            IID = p.IIDPERIODO,
                            p.NOMBRE
                        });
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarGradoSeccion()
        {
            var lista = from gs in db.GradoSeccion
                        join grado in db.Grado
                        on gs.IIDGRADO equals grado.IIDGRADO
                        join seccion in db.Seccion
                        on gs.IIDSECCION equals seccion.IIDSECCION
                        select new
                        {
                            gs.IID,
                            NOMBRE = grado.NOMBRE + " -" + seccion.NOMBRE
                        };

            return Json(lista, JsonRequestBehavior.AllowGet);

        }

        public JsonResult listarAula()
        {
            var lista = db.Aula.Where(p => p.BHABILITADO.Equals(1))
                        .Select(p => new
                        {
                            IID = p.IIDAULA,
                            p.NOMBRE
                        });
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarDocente()
        {
            var lista = db.Docente.Where(p => p.BHABILITADO.Equals(1))
                        .Select(p => new
                        {
                            IID = p.IIDDOCENTE,
                           NOMBRE = p.NOMBRE + " " + p.APPATERNO + " " + p.APMATERNO
                        });
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult listarCursos(int idperiodo, int idgradoseccion)
        {
            int iidgrado = (int) db.GradoSeccion.Where(p => p.IID.Equals(idgradoseccion)).First().IIDGRADO;

            var lista = from pgc in db.PeriodoGradoCurso
                        join curso in db.Curso
                        on pgc.IIDCURSO equals curso.IIDCURSO
                        join periodo in db.Periodo
                        on pgc.IIDPERIODO equals periodo.IIDPERIODO
                        where pgc.BHABILITADO.Equals(1)
                        && pgc.IIDPERIODO.Equals(idperiodo)
                        && pgc.IIDGRADO.Equals(iidgrado)
                        select new
                        {
                            IID = pgc.IIDCURSO,
                            curso.NOMBRE
                        };

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult recuperarInfo(int id_re)
        {
            var lista = db.GradoSeccionAula.Where(p => p.IID.Equals(id_re)).Select(p => new
                {
                    p.IID,
                    p.IIDPERIODO,
                    p.IIDGRADOSECCION,
                    p.IIDCURSO,
                    p.IIDDOCENTE,
                    p.IIDAULA
                    
                });

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(GradoSeccionAula oGradoSeccionAula)
        {
            int nregistros = 0;

            try
            {
                int iidgradoseccionaula = oGradoSeccionAula.IID;
                if (iidgradoseccionaula == 0)
                {
                    db.GradoSeccionAula.InsertOnSubmit(oGradoSeccionAula);
                    db.SubmitChanges();
                    nregistros = 1;
                }
                else
                {
                    GradoSeccionAula obj = db.GradoSeccionAula.Where(p => p.IID.Equals(iidgradoseccionaula)).First();
                    obj.IIDAULA = oGradoSeccionAula.IIDAULA;
                    obj.IIDCURSO = oGradoSeccionAula.IIDCURSO;
                    obj.IIDDOCENTE = oGradoSeccionAula.IIDDOCENTE;
                    obj.IIDGRADOSECCION = oGradoSeccionAula.IIDGRADOSECCION;
                    obj.IIDPERIODO = oGradoSeccionAula.IIDPERIODO;
                    db.SubmitChanges();
                    nregistros = 1;


                }

            }catch(Exception e)
            {
                nregistros = 0;
            }


            return nregistros;
        }

        public int eliminar(int id_gr)
        {
            int nregistros = 0;
            try
            {

                GradoSeccionAula obj = db.GradoSeccionAula.Where(p => p.IID.Equals(id_gr)).First();
                obj.BHABILITADO = 0;
                db.SubmitChanges();
                nregistros = 1;

            }
            catch(Exception e)
            {
                nregistros = 0;
            }

            return nregistros;
        }

    }
}