const thu = JSON.parse(decodeURIComponent(hocPhi.replace(/&quot;/g, '"')));
const chi = JSON.parse(decodeURIComponent(luong.replace(/&quot;/g, '"')));
console.log(thu, chi);
let hp = [];
let lu = [];
thu.map((item) => {
    hp = [...hp, item.TONG];
});
chi.map((item) => {
    lu = [...lu, item.TONG];
});

var ctx = document.querySelector("#chart").getContext("2d");
var chart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
        ],
        datasets: [
            {
                label: "Học phí (VNĐ)",
                data: hp,
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                borderColor: "rgba(0, 123, 255, 1)",
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: "rgba(0, 123, 255, 1)",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
            },
            {
                label: "Lương (VNĐ)",
                data: lu,
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                borderColor: "rgba(255, 0, 0, 1)",
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: "rgba(0, 123, 255, 1)",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
            },
        ],
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "VNĐ",
                },
            },
        },
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    },
});
