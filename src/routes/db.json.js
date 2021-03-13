export async function get(req, res) {
  const testTableData = await req.prisma.testtable.findMany();
  
  res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(testTableData));
}