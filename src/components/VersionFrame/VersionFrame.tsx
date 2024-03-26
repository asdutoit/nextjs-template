"use client";

import React, { useEffect } from "react";
import styles from "./VersionFrame.module.scss";
import { Button } from "../ui/button";
import Image from "next/image";
import pjson from "../../../package.json";

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(date);
};

export default function VersionFrame() {
  const [version, setVersion] = React.useState("1");
  const [deployed, setDeployed] = React.useState("1 March 2024");

  useEffect(() => {
    // fetch version and deployed date
    const fetchVersion = async () => {
      const response = await fetch(
        "http://localhost:8080/deployment?organization=span&product=adss&systemLayer=frontend&environment=production",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setVersion(data.Version);
      const formattedDate = formatDate(data.Deployed_at);
      setDeployed(formattedDate);
    };
    fetchVersion();
  }, []);

  return (
    <div className="shadow-md my-10 border-2 rounded">
      <div className={styles.versionWrapper}>
        <div className={styles.versionBody}>
          <div className={styles.logoWrapper}>
            <Image
              src="/adss-logo-semi-color.svg"
              alt="ADSSLogo"
              width={200}
              height={200}
              // loader={myLoader}
            />
          </div>
          <div className="">
            <div className="font-bold">
              Dynamic Version: <span className="text-black">{version}</span>
            </div>
            <div className="font-bold">
              Package.json Version:{" "}
              <span className="text-black">{pjson.version}</span>
            </div>
            <div className="font-bold">
              Deployed: <span className="text-black">{deployed}</span>
            </div>
          </div>
          <div className="my-2 text-xs">
            Copyright &copy; {new Date().getFullYear()} SPAN Digital Inc
          </div>
          <Button>OK</Button>
        </div>
      </div>
    </div>
  );
}
