import React from "react";
import Image from "next/image";
import coverImg from "/public/images/bg5.jpg";
import Form from "@/components/auth/Form";

const Signup = () => {
  return (
    <div>
      <div className="absolute inset-0">
        <Image
          src={coverImg}
          alt="Background"
          layout="fill"
          objectFit="cover"
          style={{ opacity: 0.4, zIndex: 0 }}
          priority
        />
      </div>

      <div className="relative z-10">
        <Form type="signup" />
      </div>
    </div>
  );
};

export default Signup;
