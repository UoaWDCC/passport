import { useEffect, useState, useCallback } from "react"
import DataTable, { TableColumn } from "react-data-table-component"

const data = [{ _id: "Placeholder", userId: "Placeholder", redeemed: false }]

function PrizeTable() {
  const [prizeData, setPrizeData] = useState(data)

  useEffect(() => {
    fetchPrizeData()
  }, [])

  const fetchPrizeData = useCallback(() => {
    fetch("http://localhost:3000/api/prize/non-redeemed")
      .then((res) => res.json())
      .then((datafromdb) => {
        console.log(datafromdb)
        setPrizeData(datafromdb)
      })
      .catch((error) => {
        console.error("Error fetching prize data:", error)
      })
  }, [])

  const handleRowSelected = useCallback(
    (row: { _id: string; redeemed: unknown }) => {
      const updatedPrizeData = prizeData.map((item) =>
        item._id === row._id ? { ...item, redeemed: !item.redeemed } : item
      )
      setPrizeData(updatedPrizeData)

      // Make HTTP request to update the redeemed status and time
      fetch(`http://localhost:3000/api/prize/update-redeemed/${row._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          redeemed: !row.redeemed,
          redeemedTime: new Date(),
        }), // Send the updated redeemed status and time
      }).then((response) => {
        if (!response.ok) {
          console.error(
            "Failed to update redeemed status:",
            response.statusText
          )
        }
      })
    },
    [prizeData]
  )

  const columns: TableColumn<{
    _id: string
    userId: string
    redeemed: boolean
  }>[] = [
    { name: "userId", selector: (row) => row.userId, sortable: true },
    {
      name: "Prize Recevied",
      selector: (row) => row.redeemed,
      sortable: true,
      cell: (row) => (
        <input
          type="checkbox"
          checked={row.redeemed}
          onChange={() => handleRowSelected(row)}
        />
      ),
    },
  ]

  return (
    <div style={{ width: "75%" }}>
      <DataTable
        title="Prizes"
        columns={columns}
        data={prizeData.filter((prize) => !prize.redeemed)}
        pagination
        highlightOnHover
      />
    </div>
  )
}

export default PrizeTable