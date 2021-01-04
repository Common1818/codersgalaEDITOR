import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SpecialityContext } from "../../../contexts/specialityContext";

const SpecialityPreviewArticle = ({
  Specialities,
  requiredSpeciality,
  articles,
}) => {
  const { specialities } = useContext(SpecialityContext).specialities;
  var item;
  specialities &&
    specialities.map((speciality) => {
      if (speciality.Name === requiredSpeciality) {
        item = speciality;
      }
    });
  return (
    <div className="card">
      <h1 className="material-icons card-header ">
        Read This before You start...
      </h1>
      <hr />

      <div className="ql-snow" key={item && item.id}>
        <div
          key={item && item.id}
          className="card-no-body ql-editor"
          dangerouslySetInnerHTML={{
            __html: item && item.ArticleContent,
          }}
        ></div>
        <div>
          <Link
            to={"/" + requiredSpeciality + "/" + "read" + "/before-you-start"}
          >
            <h2 className="link">Read More.....</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpecialityPreviewArticle;
