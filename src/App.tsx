import { HashRouter } from "react-router-dom";
import Routing from "./routing";
import { QueryClient, QueryClientProvider } from "react-query";
import { MainLayout } from "./components/layouts/MainLayout";
import { App, ConfigProvider, theme } from "antd";

const queryClient = new QueryClient();

function AppComponent() {
    return (
        <App>
            <QueryClientProvider client={queryClient}>
                <HashRouter>
                    <ConfigProvider
                        theme={{
                            algorithm: theme.darkAlgorithm,
                        }}
                    >
                        <MainLayout>
                            <Routing />
                        </MainLayout>
                    </ConfigProvider>
                </HashRouter>
            </QueryClientProvider>
        </App>
    );
}

export default AppComponent;
