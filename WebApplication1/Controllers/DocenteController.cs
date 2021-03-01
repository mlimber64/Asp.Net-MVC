using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class DocenteController : Controller
    {
        // GET: Docente

        PruebaDataContext bd = new PruebaDataContext();
        
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult findAllSexo()
        {
            var lista = (bd.Sexo.Where(p => p.BHABILITADO.Equals(1)).Select(p => new { IID = p.IIDSEXO, p.NOMBRE })).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult findAllDocente()
        {
            //var lista = (from docente in bd.Docente where docente.BHABILITADO.Equals(1) select new { docente.IIDDOCENTE, docente.NOMBRE, docente.APPATERNO, docente.APMATERNO, docente.EMAIL }).ToList();

            var lista = bd.Docente.Where(p => p.BHABILITADO.Equals(1)).Select(p => new { p.IIDDOCENTE, p.NOMBRE, p.APPATERNO, p.APMATERNO, p.EMAIL }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult filtrarDocentexModalidad(int idmodalidad)
        {

            var lista = bd.Docente.Where(p => p.BHABILITADO.Equals(1) && p.IIDMODALIDADCONTRATO.Equals(idmodalidad)).Select(p => new { p.IIDDOCENTE, p.NOMBRE, p.APPATERNO, p.APMATERNO, p.EMAIL }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }



        public JsonResult findAllModalidadContrato()
        {
            var lista = bd.ModalidadContrato.Where(p => p.BHABILITADO.Equals(1)).Select(p => new {IID = p.IIDMODALIDADCONTRATO, p.NOMBRE }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int eliminar(int id_docente)
        {
            int nuroRegistrosAfectados = 0;
            try
            {
                
                Docente oDocente = bd.Docente.Where(p => p.IIDDOCENTE.Equals(id_docente)).First();
                oDocente.BHABILITADO = 0;
                bd.SubmitChanges();
                nuroRegistrosAfectados = 1;
            }
            catch(Exception ex)
            {
                nuroRegistrosAfectados = 0;
            }
            return nuroRegistrosAfectados;
        }

        public JsonResult recuperarDocente(int id_docente)
        {
            var lista = bd.Docente.Where(p => p.IIDDOCENTE.Equals(id_docente)).Select(p => new {

                p.IIDDOCENTE,
                p.NOMBRE,
                p.APPATERNO,
                p.APMATERNO,
                p.DIRECCION,
                p.TELEFONOCELULAR,
                p.TELEFONOFIJO,
                p.EMAIL,
                p.IIDSEXO,
                FECHACON = ((DateTime)p.FECHACONTRATO).ToShortDateString(),
                p.IIDMODALIDADCONTRATO,
                FOTOMOSTRAR = Convert.ToBase64String(p.FOTO.ToArray())

            });

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(Docente oDocente, string cadenaFoto)
        {
            int nregistrosAfectados = 0;

            try
            {
                int iddocente = oDocente.IIDDOCENTE;
                if(iddocente.Equals(0))
                {
                    oDocente.FOTO = Convert.FromBase64String(cadenaFoto);
                    bd.Docente.InsertOnSubmit(oDocente);
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;
                }else
                {
                    Docente obj = bd.Docente.Where(p => p.IIDDOCENTE.Equals(iddocente)).First();

                    obj.NOMBRE = oDocente.NOMBRE;
                    obj.APPATERNO = oDocente.APPATERNO;
                    obj.APMATERNO = oDocente.APMATERNO;
                    obj.DIRECCION = oDocente.DIRECCION;
                    obj.TELEFONOCELULAR = oDocente.TELEFONOCELULAR;
                    obj.TELEFONOFIJO = oDocente.TELEFONOFIJO;
                    obj.EMAIL = oDocente.NOMBRE;
                    obj.IIDSEXO = oDocente.IIDSEXO;
                    obj.FECHACONTRATO = oDocente.FECHACONTRATO;
                    obj.IIDMODALIDADCONTRATO = oDocente.IIDMODALIDADCONTRATO;
                    obj.FOTO = Convert.FromBase64String(cadenaFoto);
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