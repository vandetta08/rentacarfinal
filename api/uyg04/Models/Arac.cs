
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------


namespace uyg04.Models
{

using System;
    using System.Collections.Generic;
    
public partial class Arac
{

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
    public Arac()
    {

        this.Kayit = new HashSet<Kayit>();

    }


    public string aracId { get; set; }

    public string aracNo { get; set; }

    public string aracAdi { get; set; }

    public string aracFoto { get; set; }



    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<Kayit> Kayit { get; set; }

}

}