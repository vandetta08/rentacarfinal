using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uyg04.ViewModel
{
    public class KategoriModel
    {

        public string kategoriId { get; set; }
 /*       public string suv { get; set; }
        public string hatchback { get; set; }
        public string pickup { get; set; } */
        public string kategoriFiyat { get; internal set; }
        public object kategoriNo { get; internal set; }
        public string kategoriAdi { get; set; }

    }
}