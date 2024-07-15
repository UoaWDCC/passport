const RedeemPrizeButton = () => (
  <div>
    <button
      className="btn bg-[#03045e] text-white hover:bg-[#03045e]"
      onClick={async () => {
        const accessToken = localStorage.getItem("accessToken")
        // Redeem prize
        await fetch(
          `${
            import.meta.env.VITE_SERVER_URL
          }/api/user/redeem-prize/${accessToken}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            console.log(res.json())
          })
          .catch((error) => {
            console.error(error)
          })
      }}
    >
      Click to Redeem Prize
    </button>
  </div>
)

export default RedeemPrizeButton
