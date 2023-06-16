using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web.Http;
using uyg04.Models;
using uyg04.ViewModel;
namespace uyg04.Controllers
{
    public class ServisController : ApiController
    {
        DB03Entities db = new DB03Entities();
        SonucModel sonuc = new SonucModel();
        #region Arac


        [HttpGet]
        [Route("api/aracliste")]
        public List<AracModel> AracListe()
        {
            List<AracModel> liste = db.Arac.Select(x => new AracModel()
            {
                aracId = x.aracId,
                aracAdi = x.aracAdi,
                aracNo = x.aracNo,
                aracFoto = x.aracFoto,
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/aracbyid/{aracId}")]
        public AracModel AracById(string aracId)
        {
            AracModel kayit = db.Arac.Where(s => s.aracId == aracId).Select
                (x => new
                AracModel()
                {

                    aracId = x.aracId,
                    aracAdi = x.aracAdi,
                    aracNo = x.aracNo,
                    aracFoto = x.aracFoto,


                }).FirstOrDefault();
            return kayit;
        }
        [HttpPost]
        [Route("api/aracekle")]
        public SonucModel DersEkle(AracModel model)
        {
            if (db.Arac.Count(s => s.aracAdi == model.aracAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Arac Kodu Kayıtlıdır!";
                return sonuc;
            }
            Arac yeni = new Arac();
            yeni.aracId = Guid.NewGuid().ToString();
            yeni.aracNo = model.aracNo;
            yeni.aracAdi = model.aracAdi;
            yeni.aracFoto = "main.jpg";
            //yeni.aracFoto = model.aracFoto;

            db.Arac.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Arac Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/aracdüzenle")]

        public SonucModel AracDüzenle(AracModel model)
        {
            Arac kayit = db.Arac.Where(s => s.aracId == model.aracId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Arac Bulunamadı!";
                return sonuc;
            }
            kayit.aracAdi = model.aracAdi;
            kayit.aracId = model.aracId;
            kayit.aracNo = model.aracNo;
            kayit.aracFoto = model.aracFoto;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Arac Düzenlendi!";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/aracsil/{aracId}")]

        public SonucModel AracSil(string aracId)
        {
            Arac kayit = db.Arac.Where(s => s.aracId == aracId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Arac Bulunamadı!";
                return sonuc;
            }

            if (db.Kayit.Count(s => s.kayitAracId == aracId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Aracye Kayıtlı Arac Olduğu İçin Arac Silinemez!";
                return sonuc;
            }

            db.Arac.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Arac Silindi!";

            return sonuc;

        }
        [HttpPost]
        [Route("api/aracfotoguncelle")]
        public SonucModel AracFotoGuncelle(aracFotoModel model)
        {
            Arac arac = db.Arac.Where(s => s.aracId == model.aracId).SingleOrDefault();
            if(arac == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
            return sonuc;
            }
            if (arac.aracFoto != "profil.jpg" )
            {
                string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" +
                    arac.aracFoto);
                if (File.Exists(yol))
                {
                    File.Delete(yol);
                }
            }

            string data = model.fotoData;
            string base64 = data.Substring(data.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgbytes = Convert.FromBase64String(base64);
            string dosyaAdi = arac.aracId + model.fotoUzanti.Replace("image/", ".");
            using(var ms=new MemoryStream(imgbytes,0,imgbytes.Length))
            {
                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" +
                 dosyaAdi));

            }
            arac.aracFoto = dosyaAdi;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Fotoğraf Güncellendi";
            return sonuc;

        }
        #endregion



    }
}
