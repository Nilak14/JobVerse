"use client";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import swaggerDocument from "../../../../../../public/swagger.json";

const page = () => {
  return (
    <div>
      <SwaggerUI spec={swaggerDocument} />
    </div>
  );
};
export default page;
