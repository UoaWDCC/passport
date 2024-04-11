import { useEffect, useState } from "react"
import DataTable, { TableColumn } from "react-data-table-component"

const data = [{ userId: "Placeholder", redeemed: false }]

function PrizeTable() {
  const [prizeData, setPrizeData] = useState(data)

  useEffect(() => {
    fetch("http://localhost:3000/api/prize/non-redeemed")
      .then((res) => res.json())
      .then((datafromdb) => {
        setPrizeData(datafromdb)
      })
  }, [])

  // Moved the function definition above its usage
  const handleRowSelected = (row: { userId: string; redeemed?: boolean }) => {
    setPrizeData((prevData) =>
      prevData.map((item) =>
        item.userId === row.userId
          ? { ...item, redeemed: !item.redeemed }
          : item
      )
    )
  }

  const columns: TableColumn<{ userId: string; redeemed: boolean }>[] = [
    { name: "userId", selector: (row) => row.userId, sortable: true },
    {
      name: "Redeemed",
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
    <div>
      <h1>Some text</h1>
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
