/* eslint-disable jsx-a11y/alt-text */
import { Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import theme from "../../theme";
import useAPI from "../../hooks/useAPI";
import { getDataFromAPI } from "../../utils/API";
import "react-loading-skeleton/dist/skeleton.css";

const Category = ({ token, setToken, setTitle, setBack }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const { response, setConfig } = useAPI();

  useEffect(() => {
    setTitle("Materi");
    setBack(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get category list
  useEffect(() => {
    if (response) {
      if (response.message === "Unauthorized") {
        setToken(null);
      } else {
        setTimeout(() => {
          setCategory([...category, ...response.data.latest]);
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, setToken]);

  // set parameter for API and call it
  useEffect(() => {
    setConfig(getDataFromAPI(`material`, token));
  }, [setConfig, token]);

  const ItemLearn = (item) => {
    item = item.item;
    return (
      <Card style={{ margin: `${theme.spacing(4)} 0` }}>
        <CardActionArea>
          <Box className="material-filter" onClick={() => navigate("list", { state: item.id })}>
            <Typography variant="h5" color="rgb(255, 255, 255)" textAlign={"center"} sx={{ margin: "0 0.5em" }}>
              {item.title}
            </Typography>
          </Box>
          <CardMedia component="img" height="160" image={item.banner} alt={item.title} />
        </CardActionArea>
      </Card>
    );
  };

  const SkeletonLoad = () => {
    return (
      <div style={{ margin: `${theme.spacing(4)} 0` }}>
        <div style={{ height: "160px" }}>
          <Skeleton height={160} />
        </div>
      </div>
    );
  };

  const waitingData = () => {
    let res = [];
    for (let index = 0; index < 3; index++) {
      res.push(<SkeletonLoad key={Math.random() * 10} />);
    }
    return <>{res}</>;
  };

  return <Box>{category.length > 0 ? category.map((data) => <ItemLearn key={data.title} item={data} />) : waitingData()}</Box>;
};

export default Category;
