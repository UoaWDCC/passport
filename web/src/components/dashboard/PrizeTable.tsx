import { useState } from "react"
import DataTable, { TableColumn } from "react-data-table-component"

const data = [
  { name: "Prize 1", redeemed: false },
  { name: "Prize 2", redeemed: false },
]

function PrizeTable() {
  const [prizeData, setPrizeData] = useState(data)

  // Moved the function definition above its usage
  const handleRowSelected = (row) => {
    setPrizeData((prevData) =>
      prevData.map((item) =>
        item.name === row.name ? { ...item, redeemed: !item.redeemed } : item
      )
    )
  }

  const columns: TableColumn<{ name: string; redeemed: boolean }>[] = [
    { name: "Name", selector: (row) => row.name, sortable: true },
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
