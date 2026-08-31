/* =====================================================
   NAGRIX CIVIC INNOVATION HUB
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const button =
            document.getElementById(
                "enterInnovation"
            );

        const status =
            document.getElementById(
                "innovationStatus"
            );


        /* =========================================
           ENTER INNOVATION HUB
        ========================================= */

        button.addEventListener(
            "click",
            function () {

                status.textContent =
                    "Opening NAGRIX Innovation Hub...";

                status.classList.add("show");


                button.disabled = true;

                button.style.opacity = "0.75";


                setTimeout(
                    function () {

                        /*
                         * Change this file name
                         * if your actual research
                         * page has another name.
                         */

                        window.location.href =
                            "research.html";

                    },
                    700
                );

            }
        );


        /* =========================================
           PIPELINE CARD CLICK
        ========================================= */

        const cards =
            document.querySelectorAll(
                ".pipeline-card"
            );


        cards.forEach(
            function (card) {

                card.addEventListener(
                    "click",
                    function () {

                        cards.forEach(
                            function (item) {

                                item.style.borderColor =
                                    "rgba(148, 163, 184, 0.18)";

                            }
                        );


                        card.style.borderColor =
                            "rgba(0, 217, 255, .7)";

                    }
                );

            }
        );

    }
);