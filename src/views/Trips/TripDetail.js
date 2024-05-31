import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import {
  // Card,
  Table,
  Container,
  Row,
  Col,
  Modal,
  // Button,
} from "react-bootstrap";
import axios from "axios";

import { BsFillStarFill } from "react-icons/bs";
import { CgEyeAlt } from "react-icons/cg";
import {
  CardHeader,
  Button,
  Rating,
  Typography,
  IconButton,
  CardActions,
  Divider,
  SpeedDialIcon,
  Radio,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import {
  Edit,
  AirportShuttleIcon,
  AirportShuttle,
  Man,
  PersonPinCircleOutlined,
  Person,
  Info,
  InfoOutlined,
  LocalGasStation,
  Wifi,
  Money,
  Speed,
  SpatialAudio,
  NightShelter,
  CarRental,
  CheckCircle,
} from "@mui/icons-material";
import { formatProfessionalDate } from "utils";
import { formatProfessionalDateAndTime } from "utils";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const TripDetail = () => {
  const [data, setData] = useState({});
  const params = useParams();
  console.log("ParamsId", params.id);

  const gettingInfo = async (item) => {
    const headers = {
      authorization: localStorage.getItem("authorization"),
    };
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/v1/parcel/${params.id}`,
      { headers }
    );
    console.log(response.data, "GetParcel");
    setData(response.data);
  };

  useEffect(() => {
    gettingInfo();
  }, []);

  function containsLocationInfo(inputString) {

    const locationPattern =
      /{"coordinates":{"latitude":\d+\.\d+,"longitude":\d+\.\d+},"locationName":"[^"]+"}/;

      const locationPattern2 = /\{\"coordinates\"\:\{\"latitude\"\:([\-]?\d+\.\d+),\"longitude\"\:([\-]?\d+\.\d+)\}\}/;

const locationPattern3 = /\{\"latitude\":(\d+\.\d+),\"longitude\":(\d+\.\d+)\}/;


    const coordinatesPattern = /\d+\.\d+,\d+\.\d+/;
    console.log(locationPattern2.test(inputString))
    return (
      (locationPattern.test(inputString) ||
      coordinatesPattern.test(inputString)) ||
      locationPattern2.test(inputString) || locationPattern3.test(inputString)
    );
  }

  const getFormattedLocation = (location) => {
    if (!location) {
      return "N/A";
    }

    if (containsLocationInfo(location)) {
      const locationData = JSON.parse(location);
      if (locationData?.locationName) {
        const myCity = locationData?.locationName;

        return myCity;
      }
      if(locationData.coordinates){
        const { latitude, longitude } = locationData.coordinates;
      return `${latitude},${longitude}`;
      }
      return `${locationData.latitude},${locationData.longitude}`
      
    } else {
      return location.replace(/"/g, "");
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columnSpacing={2}>
          <Grid xs={8}>
            <Card
              sx={{
                borderRadius: 4,
                overflowX: "scroll",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  width: "0.25rem",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {/* <CardHeader
                sx={{ borderBottom: "1px solid #6c757d26", py: 2 }}
                title={
                  <Box
                    sx={{
                      
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1,
                      
           
                    }}
                  >
                    <Typography color={"rgb(111, 66, 193)"} fontWeight={600}>
                      BOOKING DETAIL
                    </Typography>
                    <IconButton size="small">
                      <Edit color="rgb(111, 66, 193)" />
                    </IconButton>
                  </Box>
                }
              /> */}
              <CardActions>
                <Box sx={{ px: 2 }}>
                  <Typography
                    sx={{ fontWeight: 500, py: 2, fontSize: "1.4rem" }}
                  >
                    One Way
                  </Typography>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        pb: 3,
                      }}
                    >
                      <Box>
                        <Typography sx={{ color: "#6c757dc7" }}>
                          From
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: "1.4rem",
                            // overflowWrap: "wrap",
                            width: "15rem",
                            height: "auto",
                          }}
                          component={"h7"}
                        >
                          {getFormattedLocation(data?.from_location)}
                        </Typography>
                      </Box>
                      <Box sx={{ width: "20rem", px: 1, alignSelf: "center" }}>
                        <Divider sx={{ alignSelf: "center" }}>
                          <AirportShuttle color="primary" />
                        </Divider>
                      </Box>
                      <Box>
                        <Typography sx={{ color: "#6c757dc7" }}>To</Typography>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: "1.4rem",
                            // overflowWrap: "wrap",
                            width: "15rem",
                            height: "auto",
                          }}
                          component={"h7"}
                        >
                          {getFormattedLocation(data?.to_location)}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      sx={{
                        color: "#6c757dc7",
                        fontSize: "1.5rem",
                        textTransform: "capitalize",
                      }}
                      component={"h6"}
                    >
                      Date of departure
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.2rem",
                        textTransform: "capitalize",
                        pb: 2,
                      }}
                      component={"h6"}
                    >
                     { formatProfessionalDateAndTime(data?.time)}
                      {/* {data?.time} */}
                    </Typography>

                    <Divider />
                    <Box>
                      <Typography fontWeight={600} py={2}>
                       
                        <Typography
                          sx={{
                            color: "#6c757dc7",
                            fontSize: "1rem",
                            fontWeight: 400,
                            textTransform: "capitalize",
                          }}
                          component={"span"}
                        >
                          Driver 
                        </Typography>{" "}
                        - {data?.rider_id?.first_name +
                              "  " +
                              data?.rider_id?.last_name}
                      </Typography>
                      <Box
                        sx={{
                          pb: 4,
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          gap: 4,
                        }}
                      >
                        <Box
                          sx={{
                            width: "10rem",
                            height: "8rem",
                            background: "#FFF",
                          }}
                        >
                          <img
                            src={
                              data?.rider_id?.cover_image
                                ? data?.rider_id?.cover_image
                                : "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                            }
                            className="w-100 h-100 object-fit-cover shadow-sm  rounded-4"
                            style={{ borderRadius: "5px" }}
                          />
                        </Box>
                        <Box>
                          <Typography fontWeight={600}>
                            Toyato Innova Crystal
                          </Typography>
                          <Box className="d-flex py-2 text-muted" gap={2}>
                            <Typography>
                              <Person color="rgb(111, 66, 193)" /> 6person
                            </Typography>
                            <Typography>
                              <InfoOutlined color="rgb(111, 66, 193)" /> 6 Hours
                              23 min
                            </Typography>
                          </Box>
                          <Box className="d-flex" gap={1}>
                            <Money />
                            <LocalGasStation />
                            <Wifi />
                          </Box>
                        </Box>
                      </Box>
                      <Divider />
                      <Typography fontWeight={600} py={2}>
                       
                       <Typography
                         sx={{
                           color: "#6c757dc7",
                           fontSize: "1rem",
                           fontWeight: 400,
                           textTransform: "capitalize",
                         }}
                         component={"span"}
                       >
                         Customer Name 
                       </Typography>{" "}
                       -  {data?.customer_id?.first_name +
                              "  " +
                              data?.customer_id?.last_name}
                     </Typography>
                      <Box
                        sx={{
                          py: 4,
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          gap: 4,
                        }}
                      >
                        <Box
                          sx={{
                            width: "10rem",
                            height: "8rem",
                            background: "#FFF",
                          }}
                        >
                          <img
                            src={
                              data?.customer_id?.cover_image
                                ? data?.customer_id?.cover_image
                                : "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                            }
                            className="w-100 h-100 object-fit-cover shadow-sm  rounded-4"
                            style={{ borderRadius: "5px" }}
                          />
                        </Box>
                        <Box>
                          <Typography fontWeight={600}>
                           {/* } {data?.customer_id?.first_name +
                              "  " +
                              data?.customer_id?.last_name */}
                            <Typography
                              component={"span"}
                              className="text-muted"
                              fontSize={".8rem"}
                            >
                              {" "}
                              {data?.customer_id?.gender === "male" ? "M" : "F" } | {data?.customer_id?.age+ "Yrs"}
                              <CheckCircle color="success" fontSize="1rem" />
                            </Typography>
                          </Typography>
                          <Box className="d-flex py-2 text-muted" gap={2}>
                            <Typography>
                               Phone : {data.customer_id?.phone}
                            </Typography>
                            
                          </Box>
                          <Box className="d-flex py-2 text-muted" gap={2}>
                            <Typography>
                               City : {data.customer_id?.city}
                            </Typography>
                            
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={4}>
            <Card sx={{ borderRadius: 4, marginBottom: "20px" }}>
              <CardHeader
                sx={{ borderBottom: "1px solid #6c757d26", py: 2 }}
                title={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1,
                    }}
                  >
                    <Typography
                      component={"h6"}
                      color={"rgb(111, 66, 193)"}
                      fontWeight={600}
                    >
                      Payment
                    </Typography>
                  </Box>
                }
              />
              <CardActions>
                <Box py={2} px={2}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8rem",
                      marginBottom:"25px"
                    }}
                  >
                    <Typography component={"h6"} fontWeight={500}>
                      Total Payable Fare
                    </Typography>

                    <Typography
                      component={"h6"}
                      color={"rgb(111, 66, 193)"}
                      fontWeight={600}
                    >
                      RS{data?.fare}
                    </Typography>
                  </Box>
                  {/* <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      py: 4,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}
                    >
                      <Box>
                        <Radio />
                      </Box>
                      <Box>
                        <Typography fontWeight={600}>
                          Tentative Booking{" "}
                        </Typography>
                        <Typography className="text-muted">
                          We, will reserve the vehicle for you, but the
                          availablilty ist't gauranteed. Make part payment to
                          hold the vehicle{" "}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}
                    >
                      <Box>
                        <Radio />
                      </Box>
                      <Box>
                        <Typography fontWeight={600}>
                          Tentative Booking{" "}
                        </Typography>
                        <Typography className="text-muted">
                          We, will reserve the vehicle for you, but the
                          availablilty ist't gauranteed. Make part payment to
                          hold the vehicle{" "}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}
                    >
                      <Box>
                        <Radio />
                      </Box>
                      <Box>
                        <Typography fontWeight={600}>
                          Tentative Booking{" "}
                        </Typography>
                        <Typography className="text-muted">
                          We, will reserve the vehicle for you, but the
                          availablilty ist't gauranteed. Make part payment to
                          hold the vehicle{" "}
                        </Typography>
                      </Box>
                    </Box>
                  </Box> */}
                  {/* <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        px: 3,
                        background:
                          "linear-gradient(to left bottom, #525051, #564953, #564358, #503f60, #443c6a, #3e3c76, #323d82, #1a3f8f, #1f41a0, #2943b0, #3743c0, #4842cf)",
                      }}
                    >
                      Pay And Confirm
                    </Button>
                    <Typography sx={{ textAlign: "center" }}>
                      By clicking on Pay Now, you are agreeing to{" "}
                      <Typography color={"rgb(111, 66, 193)"} fontWeight={600}>
                        terms & conditions
                      </Typography>
                    </Typography>
                  </Box> */}
                </Box>
              </CardActions>
              {/* <CardHeader
                sx={{ borderTop: "1px solid #6c757d26", py: 2, px: 2 }}
                title={
                  <Typography component={"h6"} fontWeight={600} px={2}>
                    Fee Detail
                  </Typography>
                }
              /> */}
            </Card>

            <Card sx={{ borderRadius: 4 }}>
              <CardHeader
                sx={{ borderBottom: "1px solid #6c757d26", py: 2 }}
                title={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1,
                    }}
                  >
                    <Typography color={"rgb(111, 66, 193)"} fontWeight={600}>
                      Parcel Detail
                    </Typography>
                  </Box>
                }
              />
              <CardActions>
                <Box
                  sx={{
                    px: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 2,
                    }}
                  >
                    <Typography sx={{ fontWeight: 600 }} component={"div"}>
                      Total Fare:
                    </Typography>
                    <Typography component={"span"} className="text-muted">
                      {data?.fare}
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }} component={"div"}>
                      Parcel Height:
                    </Typography>
                    <Typography component={"span"} className="text-muted">
                      {data?.height}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 2,
                    }}
                  >
                    <Typography sx={{ fontWeight: 600 }} component={"div"}>
                      Status :
                    </Typography>
                    <Typography
                      component={"span"}
                      className={
                        data?.status == "cancelled"
                          ? "text-danger"
                          : data?.status == "completed"
                          ? "text-success"
                          : "text-warning"
                      }
                    >
                      {data?.status}
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }} component={"div"}>
                      Parcel Width :
                    </Typography>
                    <Typography component={"span"} className="text-muted">
                      {data?.width}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 2,
                    }}
                  >
                    <Typography sx={{ fontWeight: 600 }} component={"div"}>
                      parcel type:
                    </Typography>
                    <Typography component={"span"} className="text-muted">
                      {data?.parcel_type}
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }} component={"div"}>
                      Parcel Weight :
                    </Typography>
                    <Typography component={"span"} className="text-muted">
                      {data?.weight}
                    </Typography>
                    </Box>
                </Box>
              </CardActions>
            </Card>
            
          </Grid>
          
           
         
        </Grid>
      </Box>
      {/* <Box sx={{ flexGrow: 1, mt: 3 }}>
        <Grid container spacing={3} columnSpacing={2}>
          <Grid xs={8}>
            <Card sx={{ borderRadius: 4 }}>
              <CardHeader
                sx={{ borderBottom: "1px solid #6c757d26", py: 2 }}
                title={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1,
                    }}
                  >
                    <Typography color={"rgb(111, 66, 193)"} fontWeight={600}>
                      Parcel Detail
                    </Typography>
                  </Box>
                }
              />
              <CardActions>
                <Box
                  sx={{
                    px: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    <Typography sx={{ fontWeight: 600 }} component={"div"}>
                      Total Fare:
                    </Typography>
                    <Typography component={"span"} className="text-muted">
                      {data?.fare}
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }} component={"div"}>
                      Parcel Height:
                    </Typography>
                    <Typography component={"span"} className="text-muted">
                      {data?.height}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    <Typography sx={{ fontWeight: 600 }} component={"div"}>
                      Status :
                    </Typography>
                    <Typography
                      component={"span"}
                      className={
                        data?.status == "cancelled"
                          ? "text-danger"
                          : data?.status == "completed"
                          ? "text-success"
                          : "text-warning"
                      }
                    >
                      {data?.status}
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }} component={"div"}>
                      Parcel Width :
                    </Typography>
                    <Typography component={"span"} className="text-muted">
                      {data?.width}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    <Typography sx={{ fontWeight: 600 }} component={"div"}>
                      parcel type:
                    </Typography>
                    <Typography component={"span"} className="text-muted">
                      {data?.parcel_type}
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }} component={"div"}>
                      Parcel Weight :
                    </Typography>
                    <Typography component={"span"} className="text-muted">
                      {data?.weight}
                    </Typography>
                    </Box>
                </Box>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={4}></Grid>
        </Grid>
      </Box> */}
    </>
  );
};

export default TripDetail;
