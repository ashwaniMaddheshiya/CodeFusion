import React from "react";
import Image from "next/image";
import coverImg from "/public/images/bg5.jpg";
import Form from "@/components/auth/Form";

const Signin = () => {
  return (
    <div>
      <div className="absolute inset-0 z-0">
        <Image
          src={coverImg}
          alt="Background"
          layout="fill" // This makes the image cover the entire container
          objectFit="cover" // Ensures the image covers the entire area without being distorted
          style={{ opacity: 0.4 }} // Set the opacity of the image
          priority // Load the image quickly as it’s important for the visual
        />
      </div>

      <div className="relative z-10">
        <Form type="signin" />
      </div>
    </div>
  );
};

export default Signin;
