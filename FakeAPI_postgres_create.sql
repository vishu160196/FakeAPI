CREATE TABLE "Posts" (
	"userId" bigint NOT NULL,
	"id" bigint NOT NULL,
	"title" TEXT NOT NULL,
	"body" TEXT NOT NULL,
	CONSTRAINT "Posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Users" (
	"id" bigint NOT NULL,
	"name" TEXT NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL,
	"phone" TEXT NOT NULL,
	"website" TEXT NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Addresses" (
	"userId" bigint NOT NULL,
	"street" TEXT NOT NULL,
	"suite" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"zipcode" TEXT NOT NULL,
	"geoLat" double NOT NULL,
	"geoLon" double NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "UserCompanies" (
	"userId" bigint NOT NULL,
	"name" TEXT NOT NULL,
	"catchPhrase" TEXT NOT NULL,
	"bs" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Todos" (
	"userId" bigint NOT NULL,
	"id" bigint NOT NULL,
	"title" TEXT NOT NULL,
	"completed" BOOLEAN NOT NULL,
	CONSTRAINT "Todos_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Albums" (
	"userId" bigint NOT NULL,
	"id" bigint NOT NULL,
	"title" TEXT NOT NULL,
	CONSTRAINT "Albums_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Photos" (
	"id" bigint NOT NULL,
	"albumId" bigint NOT NULL,
	"title" TEXT NOT NULL,
	"url" TEXT NOT NULL,
	"thumbnailUrl" TEXT NOT NULL,
	CONSTRAINT "Photos_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Comments" (
	"postId" bigint NOT NULL,
	"name" TEXT NOT NULL,
	"id" serial NOT NULL,
	"email" TEXT NOT NULL,
	"body" TEXT NOT NULL,
	CONSTRAINT "Comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "Posts" ADD CONSTRAINT "Posts_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("id");


ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("id");

ALTER TABLE "UserCompanies" ADD CONSTRAINT "UserCompanies_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("id");

ALTER TABLE "Todos" ADD CONSTRAINT "Todos_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("id");

ALTER TABLE "Albums" ADD CONSTRAINT "Albums_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("id");

ALTER TABLE "Photos" ADD CONSTRAINT "Photos_fk0" FOREIGN KEY ("albumId") REFERENCES "Albums"("id");

ALTER TABLE "Comments" ADD CONSTRAINT "Comments_fk0" FOREIGN KEY ("postId") REFERENCES "Posts"("id");

