export default function grid() {
    const getDays = (year) => {
      const dates = [];
      const startDate = new Date(year, 0, 1);
      while (startDate.getFullYear() === year) {
        dates.push(new Date(startDate));
        startDate.setDate(startDate.getDate() + 1);
      }
      return dates;
    };
    const divDays = getDays(2023);
    return (
      <>
        <h1 style={{ textAlign: "center" }}>My Life in Colour</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              textAlign: "center",
              display: "grid",
              gridTemplateColumns: "repeat(7, 32px)",
              gap: "2px",
            }}
          >
            <p>M</p>
            <p>T</p>
            <p>W</p>
            <p>T</p>
            <p>F</p>
            <p>S</p>
            <p>S</p>
          </div>
          <div
            style={{
              textAlign: "center",
              display: "grid",
              gridTemplateColumns: "repeat(7, 32px)",
              gap: "2px",
            }}
          >
            {divDays.map((day) => {
              const dateOfMonth = day.getDate(); // Get the date of the month
              const firstDayOfWeek = new Date(day.getFullYear(), day.getMonth(), 1).getDay();
              let gridColumn = ((firstDayOfWeek + 6) % 7) + 1; // Calculate the grid column based on the date and day of the week
  
              if (dateOfMonth > 1) {
                gridColumn = (gridColumn + dateOfMonth - 2) % 7 + 1; // Adjust the gridColumn for the remaining days of the month
              }
              return (
                <div
                  style={{
                    textAlign: "center",
                    height: "32px",
                    width: "32px",
                    borderStyle: "solid",
                    borderColor: "black",
                    borderWidth: "2px",
                    gridColumn, // Set the grid column dynamically
                  }}
                  key={day.toString()}
                >
                  {dateOfMonth}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
  