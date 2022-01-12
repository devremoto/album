USE [Album]
GO

CREATE TABLE [dbo].[Artist](
	[Id] [uniqueidentifier] NOT NULL PRIMARY KEY,
	[Name] [nvarchar](255) NULL,
	[AddedIn] [datetime2](7) NULL DEFAULT GETDATE(),
	[LastModified] [datetime2](7) NULL
	)
GO

CREATE TABLE [dbo].[AlbumType](
	[Id] [uniqueidentifier] NOT NULL PRIMARY KEY,
	[Name] [nvarchar](255) NULL,
	[AddedIn] [datetime2](7) NULL DEFAULT GETDATE(),
	[LastModified] [datetime2](7) NULL,
	)
GO

CREATE TABLE [dbo].[Album](
	[Id] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](255) NULL,
	[AlbumTypeId] [uniqueidentifier] NOT NULL,
	[ArtistId] [uniqueidentifier] NOT NULL,
	[Stock] [int] NOT NULL,
	[AddedIn] [datetime2](7) NULL DEFAULT GETDATE(),
	[LastModified] [datetime2](7) NULL	,
	CONSTRAINT [FK_Album_AlbumType_AlbumTypeId] FOREIGN KEY([AlbumTypeId]) REFERENCES [dbo].[AlbumType] ([Id]),
	CONSTRAINT [FK_Album_Artist_ArtistId] FOREIGN KEY([ArtistId]) REFERENCES [dbo].[Artist] ([Id]),
)
GO