const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                { title: "FIRST", background: "white", initial: "white" },
                { title: "SECOND", background: "white", initial: "white" }
            ],
            currentUser: JSON.parse(localStorage.getItem("currentUser")) || null, // <-- usuario logueado persistido
            token: localStorage.getItem("token") || null
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },

            // ---- LOGIN MEJORADO ----
            login: async (usuario, password) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ usuario, password })
                    });
                    const data = await resp.json();

                    if (resp.ok) {
                        // Guardamos el objeto completo del usuario en el store
                        setStore({ currentUser: data.user });
                        localStorage.setItem("currentUser", JSON.stringify(data.user));

                        // Guardamos token si el backend lo devuelve
                        if (data.token) {
                            setStore({ token: data.token });
                            localStorage.setItem("token", data.token);
                        }

                        return { success: true, data };
                    } else {
                        return { success: false, message: data.message || "Login fallido" };
                    }
                } catch (error) {
                    console.error("Error en login:", error);
                    return { success: false, message: error.message };
                }
            },

            logout: () => {
                setStore({ currentUser: null, token: null });
                localStorage.removeItem("currentUser");
                localStorage.removeItem("token");
            }
        }
    };
};

export default getState;
