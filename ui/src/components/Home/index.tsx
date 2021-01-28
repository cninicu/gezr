import React from "react";
import Box from "../Box";
import { Link } from "react-router-dom";

import "./_index.scss";

interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = (props) => {
  return (
    <div className="box--options">
      <Box className="box--options__item">
        <Link to={"/record"} className="link">
          <span className="label"> Record gestures </span>
        </Link>
      </Box>

      <Box className="box--options__item">
        <Link to={"/query"} className="link">
          <span className="label"> Query Data </span>
        </Link>
      </Box>
    </div>
  );
};

export default Home;
