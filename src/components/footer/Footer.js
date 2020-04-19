import React from 'react';
import "./Footer.css"

/*
    Website footer
    @author A.M. Aahad
*/

function Footer() {
  return (
    <div className="Footer">
      <div className="col col1">
        <h2 className="title">আমাদের সম্পর্কে</h2>
        <p className="details">
          এখানে লিখা থাকবে
        </p>
      </div>
      <div className="col col2">
      <h2 className="title">যোগাযোগ</h2>
        <p className="details">
          +৮৮০১২৩৪৫৬৭৮৯
        </p>
      </div>
    </div>
  );
}

export default Footer;
