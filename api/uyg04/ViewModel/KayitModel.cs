using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uyg04.ViewModel
{
    public class KayitModel
    {
        public int kayitId { get; set; }
        public string kayitAracId { get; set; }
        public string kayitKategoriId { get; set; }
        public AracModel aracBilgi { get; set; }
        public KategoriModel kategoriBilgi { get; set; }

    }
}