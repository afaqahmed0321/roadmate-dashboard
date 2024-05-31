import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
import {
  TbCar,
  TbCarOff,
  TbCarCrash,
  TbCaravan,
  TbUserPlus,
  TbUserOff,
  TbUsers,
  TbTiltShift,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import { BiDollarCircle, BiCar } from "react-icons/bi";
import { MdOutlineCancel, MdOutlineSendAndArchive } from "react-icons/md";
// react-bootstrap components
import axios from "axios";
import { get } from "jquery";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Modal,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
// import { useHistory } from "react-router/cjs/react-router";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CgEyeAlt } from "react-icons/cg";

function Dashboard() {
  const [data, setData] = useState();
  const [count, setCount] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [driver, setDriver] = useState([]);
  const history = useHistory();

  const getCardsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/dashboard`
      );
      console.log(response.data, "gfsygwdew");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  let totalCount = 0;
  count.map((val) => {
    totalCount += val.count;
  });

  const getCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/parcel/counts`
      );

      console.log("response", response.data)
    
      setCount(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopDriver = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/parcel/top-ten?queryFor=rider`
      );
     
      setDriver(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/parcel/top-ten?queryFor=customer`
      );
      console.log(response.data, "GetTopUser");
      setCustomer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCardsData();
    getCount();
    getTopUser();
    getTopDriver();
  }, []);
  console.log(data, "hwdwefgwuiefguif");
  return (
    <>
      <Container fluid>
        <Row>
          {/* <Col sm="12">
            <h4>Rides</h4>
            <hr />
          </Col> */}
          <Col lg="3" md="4" sm="6" >
            <Card className="card-stats shadow p-3 mb-4 bg-white rounded" style={{background: 'linear-gradient(to right, #6f42c1, #a342c1)'}} >
              <Card.Body >
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      {/* <BiCar className="text-primary" /> */}
                      <BiCar className="text-white" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <Link to="/admin/tripList">
                      <div className="numbers">
                        <p className="card-category text-white">Total Trips</p>
                        <Card.Title as="h4" >{totalCount}</Card.Title>
                      </div>
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" md="4" sm="6">
            <Card className="card-stats shadow p-3 mb-4 bg-white rounded" style={{background: "linear-gradient(to right, #007bff, #01dbdf)"}}>
              <Card.Body>
                <Row>
                  <Col xs="4">
                    <div className="icon-big text-center icon-warning">
                      {/* <TbCar className="text-info" /> */}
                      <TbCar className="text-white" />
                    </div>
                  </Col>
                  <Col xs="8">
                    {/* <Link to="/admin/tripList"> */}
                    <div
                      className="numbers"
                      onClick={() => {
                        history.push("/admin/tripList", {
                          status: "in_progress",
                        });
                      }}
                    >
                      <p className="card-category text-white"> Trips In-Progress</p>
                      <Card.Title as="h4">
                        {
                          count?.filter((val) => val._id == "in_progress")[0]
                            ?.count
                        }
                      </Card.Title>
                    </div>
                    {/* </Link> */}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" md="4" sm="6">
            <Card className="card-stats shadow p-3 mb-4 bg-white rounded" style={{background: "linear-gradient(to right, #FF292D, #fe909d)"}}>
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <TbCarOff className="text-white" />
                    </div>
                  </Col>
                  <Col xs="7">
                    {/* <Link to="/admin/tripList"> */}
                    <div
                      className="numbers"
                      onClick={() => {
                        history.push("/admin/tripList", {
                          status: "cancelled",
                        });
                      }}
                    >
                      <p className="card-category text-white">Trips Cancelled </p>
                      <Card.Title as="h4">
                        {count?.filter((val) => val._id == "cancelled")[0]
                          ?.count }
                      </Card.Title>
                    </div>

                    {/* </Link> */}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg="3" md="4" sm="6">
            <Card className="card-stats shadow p-3 mb-4 bg-white rounded" style={{    background: "linear-gradient(to right, #fe9365, #feb798)"}}>
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      {/* <TbCaravan className="text-success" /> */}
                      <TbCaravan className="text-white" />
                    </div>
                  </Col>
                  <Col xs="7">
                    {/* <Link to="/admin/tripList"> */}
                    <div
                      className="numbers"
                      onClick={() => {
                        history.push("/admin/tripList", {
                          status: "completed",
                        });
                      }}
                    >
                      <p className="card-category text-white">Trips Completed </p>
                      <Card.Title as="h4">
                        {
                          count?.filter((val) => val._id == "completed")[0]
                            ?.count
                        }
                      </Card.Title>
                    </div>
                    {/* </Link> */}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          {/* <Col lg="3" md="4" sm="6">
            <Card className="card-stats shadow p-3 mb-4 bg-white rounded">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <TbCar className="text-primary" />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Orders Pending for Pickup</p>
                      <Card.Title as="h4">23</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" md="4" sm="6">
            <Card className="card-stats shadow p-3 mb-4 bg-white rounded">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning text-success">
                      <MdOutlineSendAndArchive />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Confirm Pickup Requests </p>
                      <Card.Title as="h4">48</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" md="4" sm="6">
            <Card className="card-stats shadow p-3 mb-4 bg-white rounded">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning    text-danger">
                      <TbCarCrash />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Hits</p>
                      <Card.Title as="h4">{data?.hits}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" md="4" sm="6">
            <Card className="card-stats shadow p-3 mb-4 bg-white rounded">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning text-primary">
                      <BiDollarCircle />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Payments made</p>
                      <Card.Title as="h4">{data?.paymentMade}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col> */}

          <Col lg="6">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Top 10 Drivers by Earning</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
              <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                <Table className="table-hover table-striped">
                  <thead className="position-relative">
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Earn Money</th>
                      <th className="border-0">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {driver.map((val,index) => {
                      return (
                        <tr>
                          <td>{index+1}</td>
                          <td>
                            <TbUsers className="text-primary" />
                          </td>
                          <td>{val?.rider[0]?.first_name}</td>
                          <td>{val?.totalPayAmount}</td>
                          <td>
                          <Link
                                  to={`/admin/driverDetail/${val?.rider[0]?._id}`}
                                    className={`btn btn-fill btn-sm custom-btn btn-secondary`}
                                    style={{backgroundColor:'#6f42c1',borderColor:'#6f42c1'}}
                                  >
                                     <CgEyeAlt fontSize={20} />
                                  
                                  </Link>
                          </td>
                        </tr>
                      );
                    })}

                    
                  </tbody>
                </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Top 10 Users by Spending </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
              <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                <Table className="table-hover table-striped">
                  <thead className="position-relative">
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Image</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Earn Money</th>
                      <th className="border-0">View</th>
                    </tr>
                  </thead>
                  <tbody>
                  {customer.map((val,index) => {
                      return (
                        <tr>
                          <td>{index+1}</td>
                          <td>
                            <TbUsers className="text-primary" />
                          </td>
                          <td>{val?.customer[0]?.first_name}</td>
                          <td>{val?.totalFare}</td>
                          <td>
                          <Link
                                  to={`/admin/userDetail/${val?.customer[0]?._id}`}
                                    className={`btn btn-fill btn-sm custom-btn btn-secondary`}
                                    style={{backgroundColor:'#6f42c1',borderColor:'#6f42c1'}}
                                  >
                                  
                                     <CgEyeAlt fontSize={20} />
                                  </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">No. of payment made by Customer</Card.Title>
                <p className="card-category">Monthly Record</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mai",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      series: [
                        [
                          542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756,
                          895,
                        ],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                    // style={{color:'red',backgroundColor:'red'}}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">No. of payment made by Drivers</Card.Title>
                <p className="card-category">Monthly Record</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mai",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      series: [
                        [
                          8034, 4433, 3520, 7806, 5573, 4538, 3269, 4304, 5168,
                          6120, 7356, 1895,
                        ],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 10000,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>

                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col> */}

          {/* <Col lg="3" md="4" sm="6">
            <Card className="card-stats shadow p-3 mb-5 bg-white rounded">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <MdOutlineCancel />
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers ">
                      <p className="card-category">
                        Premature cancellations by users{" "}
                      </p>
                      <Card.Title as="h4">
                        {data?.prematureCancellationByUsers}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col> */}
        </Row>
        {/* <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Users Behavior</Card.Title>
                <p className="card-category">24 Hours performance</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "9:00AM",
                        "12:00AM",
                        "3:00PM",
                        "6:00PM",
                        "9:00PM",
                        "12:00PM",
                        "3:00AM",
                        "6:00AM",
                      ],
                      series: [
                        [287, 385, 490, 492, 554, 586, 698, 695],
                        [67, 152, 143, 240, 287, 335, 435, 437],
                        [23, 113, 67, 108, 190, 239, 307, 308],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Click <i className="fas fa-circle text-warning"></i>
                  Click Second Time
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Email Statistics</Card.Title>
                <p className="card-category">Last Campaign Performance</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: ["40%", "20%", "40%"],
                      series: [40, 20, 40],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Bounce <i className="fas fa-circle text-warning"></i>
                  Unsubscribe
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Campaign sent 2 days ago
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">2017 Sales</Card.Title>
                <p className="card-category">All products including Taxes</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mai",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                      series: [
                        [
                          542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756,
                          895,
                        ],
                        [
                          412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636,
                          695,
                        ],
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Tesla Model S <i className="fas fa-circle text-danger"></i>
                  BMW 5 Series
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Tasks</Card.Title>
                <p className="card-category">Backend development</p>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Sign contract for "What are conference organizers
                          afraid of?"
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-488980961">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-506045838">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Lines From Great Russian Literature? Or E-mails From
                          My Boss?
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-537440761">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-21130535">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Flooded: One year later, assessing what was lost and
                          what was found when a ravaging rain swept through
                          metro Detroit
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-577232198">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-773861645">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultChecked
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Create 4 Invisible User Experiences you Never Knew
                          About
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-422471719">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-829164576">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Read "Following makes Medium better"</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-160575228">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-922981635">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input
                                defaultValue=""
                                disabled
                                type="checkbox"
                              ></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Unfollow 5 enemies from twitter</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-938342127">
                                Edit Task..
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-119603706">Remove..</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row> */}
      </Container>
    </>
  );
}

export default Dashboard;
