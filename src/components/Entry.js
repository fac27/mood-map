import Exit from "@/components/Exit";

export default function Entry() {
  return (
    <>
      <div
        style={{
          position: "relative",
          height: "470px",
          width: "300px",
          borderRadius: "10px",
          borderColor: "grey",
          borderStyle: "solid",
          margin: "20px",
          padding: "20px",
        }}
      >
        <Exit />

        <h1
          style={{
            textAlign: "center",
          }}
        >
          {new Date().toLocaleDateString("en-UK", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "40px auto",
            gridTemplateRows: "repeat(3, auto)",
            gridGap: "10px",
          }}
        >
          <div
            style={{
              height: "32px",
              width: "32px",
              borderRadius: "10px",
              borderColor: "grey",
              borderStyle: "solid",
              gridColumn: "1",
              gridRow: "1",
            }}
          ></div>
          <p
            style={{
              gridColumn: "2",
              gridRow: "1",
              alignSelf: "start",
              marginTop: "auto",
            }}
          >
            Good
          </p>

          <div>
            <div
              style={{
                height: "32px",
                width: "32px",
                borderRadius: "50%",
                borderColor: "grey",
                borderStyle: "solid",
                gridColumn: "1",
                gridRow: "2",
              }}
            ></div>
          </div>
          <p
            style={{
              gridColumn: "2",
              gridRow: "2",
              alignSelf: "start",
              marginTop: "auto",
            }}
          >
            myself
          </p>
          <div
            style={{
              height: "32px",
              width: "32px",
              borderRadius: "50%",
              borderColor: "grey",
              borderStyle: "solid",
              gridColumn: "1",
              gridRow: "3",
            }}
          ></div>
          <p
            style={{
              gridColumn: "2",
              gridRow: "3",
              alignSelf: "start",
              marginTop: "auto",
            }}
          >
            outside
          </p>
        </div>
      </div>
    </>
  );
}
