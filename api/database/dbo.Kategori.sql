CREATE TABLE [dbo].[Kategori] (
    [kategoriId] NVARCHAR (50) NOT NULL,
    [suv]        NVARCHAR (50) NOT NULL,
	[kategoriAdi] NVARCHAR (50) NOT NULL,
	[kategoriKodu] NVARCHAR (50) NOT NULL,
    [hatchback]  NVARCHAR (50) NOT NULL,
    [pickup]     NVARCHAR (50) NOT NULL,
    PRIMARY KEY CLUSTERED ([kategoriId] ASC)
);

