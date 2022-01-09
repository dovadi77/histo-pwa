/* eslint-disable jsx-a11y/alt-text */
import { Card, CardActionArea, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import theme from "../../theme";
import "react-loading-skeleton/dist/skeleton.css";

const Category = ({ setTitle, setBack }) => {
  const navigate = useNavigate();
  const category = [
    { id: "easy", title: "mudah", color: "green" },
    { id: "medium", title: "sedang", color: "yellow" },
    { id: "hard", title: "sulit", color: "red" },
  ];

  useEffect(() => {
    setTitle("Games");
    setBack(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ItemLearn = (item) => {
    item = item.item;
    return (
      <Card style={{ margin: `${theme.spacing(4)} 0` }}>
        <CardActionArea>
          <Box className="material-filter" onClick={() => navigate("rank", { state: [item.id, item.title] })}>
            <Typography variant="h3" color="rgb(0,0,0)" textAlign={"center"} sx={{ margin: "0 0.5em", fontWeight: 600 }}>
              {item.title.toUpperCase()}
            </Typography>
          </Box>
          <div style={{ height: "160px", backgroundColor: item.color }}></div>
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
