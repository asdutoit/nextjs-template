-- CreateTable
CREATE TABLE "Agency" (
    "agency_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT,
    "phone" TEXT,
    "registeration_number" TEXT,
    "vat_number" TEXT,
    "email" TEXT,
    "address_street_full" TEXT,
    "address_street" TEXT,
    "address_street_number" TEXT,
    "address_optional" TEXT,
    "address_city" TEXT,
    "address_state" TEXT,
    "address_postal_code" TEXT,
    "address_suburb" TEXT,
    "address_country" TEXT,
    "address_sub_state" TEXT,
    "address_lat" DOUBLE PRECISION,
    "address_long" DOUBLE PRECISION,
    "images" TEXT[],

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("agency_id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "branch_id" SERIAL NOT NULL,
    "agency_id" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "contact_info" TEXT,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("branch_id")
);

-- CreateTable
CREATE TABLE "Agent" (
    "agent_id" SERIAL NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "contact_info" TEXT,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("agent_id")
);

-- CreateTable
CREATE TABLE "Property" (
    "property_id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("property_id")
);

-- CreateTable
CREATE TABLE "Listing" (
    "listing_id" SERIAL NOT NULL,
    "property_id" INTEGER NOT NULL,
    "agency_id" INTEGER NOT NULL,
    "agent_id" INTEGER NOT NULL,
    "lister_type" TEXT NOT NULL,
    "sole_mandate" BOOLEAN NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("listing_id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "sale_id" SERIAL NOT NULL,
    "listing_id" INTEGER NOT NULL,
    "sale_date" TIMESTAMP(3) NOT NULL,
    "sale_price" DOUBLE PRECISION NOT NULL,
    "buyer_id" INTEGER NOT NULL,
    "seller_id" INTEGER NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("sale_id")
);

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "Agency"("agency_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "Agency"("agency_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "Agent"("agent_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "Listing"("listing_id") ON DELETE RESTRICT ON UPDATE CASCADE;
