//connect to data file
const getXML = async (filename) => {
  const Connect = new XMLHttpRequest();
  Connect.open("GET", filename, false);
  Connect.setRequestHeader("Content-Type", "text/xml");
  Connect.send(null);
  return Connect.responseXML;
};

const data = await getXML("/dsps.xml");

export default data;
