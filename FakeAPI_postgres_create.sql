CREATE TABLE "Posts_vishal_singh" (
	"userId" bigint NOT NULL,
	"id" bigint NOT NULL,
	"title" TEXT NOT NULL,
	"body" TEXT NOT NULL,
	CONSTRAINT "Posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Users_vishal_singh" (
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



CREATE TABLE "Addresses_vishal_singh" (
	"userId" bigint NOT NULL,
	"street" TEXT NOT NULL,
	"suite" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"zipcode" TEXT NOT NULL,
	"geoLat" float NOT NULL,
	"geoLon" float NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "UserCompanies_vishal_singh" (
	"userId" bigint NOT NULL,
	"name" TEXT NOT NULL,
	"catchPhrase" TEXT NOT NULL,
	"bs" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Todos_vishal_singh" (
	"userId" bigint NOT NULL,
	"id" bigint NOT NULL,
	"title" TEXT NOT NULL,
	"completed" BOOLEAN NOT NULL,
	CONSTRAINT "Todos_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Albums_vishal_singh" (
	"userId" bigint NOT NULL,
	"id" bigint NOT NULL,
	"title" TEXT NOT NULL,
	CONSTRAINT "Albums_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Photos_vishal_singh" (
	"id" bigint NOT NULL,
	"albumId" bigint NOT NULL,
	"title" TEXT NOT NULL,
	"url" TEXT NOT NULL,
	"thumbnailUrl" TEXT NOT NULL,
	CONSTRAINT "Photos_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Comments_vishal_singh" (
	"postId" bigint NOT NULL,
	"name" TEXT NOT NULL,
	"id" serial NOT NULL,
	"email" TEXT NOT NULL,
	"body" TEXT NOT NULL,
	CONSTRAINT "Comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "Posts_vishal_singh" ADD CONSTRAINT "Posts_fk0" FOREIGN KEY ("userId") REFERENCES "Users_vishal_singh"("id");


ALTER TABLE "Addresses_vishal_singh" ADD CONSTRAINT "Addresses_fk0" FOREIGN KEY ("userId") REFERENCES "Users_vishal_singh"("id");

ALTER TABLE "UserCompanies_vishal_singh" ADD CONSTRAINT "UserCompanies_fk0" FOREIGN KEY ("userId") REFERENCES "Users_vishal_singh"("id");

ALTER TABLE "Todos_vishal_singh" ADD CONSTRAINT "Todos_fk0" FOREIGN KEY ("userId") REFERENCES "Users_vishal_singh"("id");

ALTER TABLE "Albums_vishal_singh" ADD CONSTRAINT "Albums_fk0" FOREIGN KEY ("userId") REFERENCES "Users_vishal_singh"("id");

ALTER TABLE "Photos_vishal_singh" ADD CONSTRAINT "Photos_fk0" FOREIGN KEY ("albumId") REFERENCES "Albums_vishal_singh"("id");

ALTER TABLE "Comments_vishal_singh" ADD CONSTRAINT "Comments_fk0" FOREIGN KEY ("postId") REFERENCES "Posts_vishal_singh"("id");

