import React from "react";
import BookHistory from "./BookHistory";
import FligbookingBody from "./FligbookingBody";
import Header from "./Header";

export default function FlightBokking() {
  return (
    <div>
      <Header />
      <section>
        <FligbookingBody /> 
        <BookHistory/> 
      </section>
    </div>
  );
}
