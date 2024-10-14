import React, { Component } from 'react';
import './prometheusAlerts.css';
import {
    SiSearxng, SiPrometheus, SiAmp, SiSequelize,
    SiEtcd, SiDocker, SiBlockbench, SiNetdata,
    SiSolidity, SiPatreon
} from 'react-icons/si';
import { FaDatabase } from 'react-icons/fa';
import yaml from 'js-yaml'

class PrometheusAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            alertCategories: [
                {
                    category: 'Basic Resource Monitoring',
                    items: [
                        { name: 'Prometheus self-monitoring', description: 'Prometheus job missing, Prometheus target missing...', icon: <SiPrometheus size={22} color="#e55b21" />, url: 'https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/prometheus-self-monitoring/embedded-exporter.yml' },
                        { name: 'Host and hardware', description: 'Host out of memory, Host memory...', icon: <SiSequelize size={22} color="#52B0E7" />, url: 'https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/host-and-hardware/node-exporter.yml' },
                        { name: 'S.M.A.R.T Device Monitoring', description: 'S.M.A.R.T device temperature warning...', icon: <SiEtcd size={22} color="#419EDA" />, url: ' https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/s.m.a.r.t-device-monitoring/smartctl-exporter.yml' },
                        { name: 'Docker containers', description: 'Container killed, Container absent...', icon: <SiDocker size={22} color="#85CDF0" />, url: 'https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/docker-containers/google-cadvisor.yml' },
                        { name: 'Blackbox', description: 'Blackbox probe failed, Blackbox probe HTTP...', icon: <SiBlockbench size={22} color="#000000" />, url: ' https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/blackbox/blackbox-exporter.yml' },
                        { name: 'Windows Server', description: 'Windows Server CPU usage, Windows Server Disk...', icon: <SiDocker size={22} color="#85CDF0" />, url: ' https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/windows-server/windows-exporter.yml' },
                        { name: 'VMware', description: 'Virtual Machines Memory Warning, Outdated Snapshots...', icon: <SiEtcd size={22} color="#85CDF0" />, url: ' https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/vmware/pryorda-vmware-exporter.yml' },
                        { name: 'Netdata', description: 'Netdata high CPU usage, Netdata high memory usage...', icon: <SiNetdata size={22} color="#85CDF0" />, url: ' https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/netdata/embedded-exporter.yml' }
                    ],
                },
                {
                    category: 'Databases and Brokers',
                    items: [
                        { name: 'MySQL', description: 'MySQL too many connections, MySQL high query response time...', icon: <FaDatabase size={22} color="#4479A1" />, url: 'https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/mysql/mysqld-exporter.yml' },
                        { name: 'PostgreSQL', description: 'PostgreSQL connection error, PostgreSQL high latency...', icon: <FaDatabase size={22} color="#4169E1" />, url: ' https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/postgresql/postgres-exporter.yml' },
                        { name: 'SQL Server', description: 'SQL Server deadlock, SQL Server high memory usage...', icon: <SiSolidity size={22} color="#85CDF0" />, url: ' https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/sql-server/ozarklake-mssql-exporter.yml' },
                        { name: 'Patroni', description: 'Patroni has no leader...', icon: <SiPatreon size={22} color="#000000" />, url: 'https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/patroni/embedded-exporter-patroni.yml' }
                    ],
                },
            ],
            showModal: false,
            selectedAlert: null,
            alertContent: '',
        };
    }

    handleSearch = (event) => {
        this.setState({ searchQuery: event.target.value });
    };


    openModal = (alert) => {
        this.setState({ showModal: true, selectedAlert: alert });

        // Fetch the data from the external URL
        fetch(alert.url)
            .then((response) => response.text())
            .then((data) => {
                // Parse the YAML content
                let parsedData;
                try {
                    parsedData = yaml.load(data); // Convert YAML to JS object

                    // Extract alert details from the parsed YAML
                    const alertRules = Object.keys(parsedData).map((key) => ({
                        title: key,
                        content: parsedData[key],
                    }));
                    console.log(alertRules, "alertRules");


                    // Update state with the parsed rules
                    this.setState({ alertContent: alertRules });
                } catch (error) {
                    console.error('Error parsing YAML:', error);
                    this.setState({ alertContent: 'Error parsing alert rules' });
                }
            })
            .catch((error) => {
                console.error('Error fetching alert content:', error);
                this.setState({ alertContent: 'Error fetching alert content' });
            });
    };

    closeModal = () => {
        this.setState({ showModal: false, selectedAlert: null, alertContent: '' });
    };

    render() {
        const { searchQuery, alertCategories, showModal, selectedAlert, alertContent } = this.state;

        return (
            <div className="alert-rule-browser">
                <header className="header">
                    <SiPrometheus size={22} color="#e55b21" /> <br />
                    <SiAmp size={22} color="#e55b21" />
                    <div className="div-word-break">
                        <span>Awesome</span>
                        <span>Prometheus</span>
                        <span>Toolkit</span>
                    </div>
                </header>
                <hr />

                <div className="content">
                    <h2>Browse Library</h2>
                    <div className="search-box-wrapper">
                        <div className="search-box">
                            <SiSearxng className="search-icon" size={15} color="#343A40" />
                            <input
                                type="text"
                                placeholder="Search for a component..."
                                value={searchQuery}
                                onChange={this.handleSearch}
                                className="search-input"
                            />
                        </div>
                    </div>
                    {alertCategories.map((category) => (
                        <div key={category.category} className="category-section">
                            <h3>{category.category}</h3>
                            <div className="alert-cards-container">
                                {category.items
                                    .filter((item) =>
                                        item.name.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
                                    .map((item) => (
                                        <div key={item.name} className="alert-card">
                                            <div className="alert-icon">{item.icon}</div>
                                            <div className="alert-info">
                                                <h4>{item.name}</h4>
                                                <p>{item.description}</p>
                                                <button
                                                    className="view-button"
                                                    onClick={() => this.openModal(item)}
                                                >
                                                    View Alert Rules
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal Implementation */}
                {showModal && selectedAlert && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close-button" onClick={this.closeModal}>
                                &times;
                            </span>
                            <di style={{ display: 'flex', marginLeft: '10px' }}><h2> {selectedAlert.icon}</h2> <h2 style={{ marginLeft: '10px' }}>{selectedAlert.name}</h2></di>

                            <hr></hr>

                            {/* Display the alert content */}
                            <div className="modal-scroll">
                                {alertContent.length > 0 ? (
                                    alertContent.map((rule, index) => (
                                        <div key={index} className="rule-section">
                                            {rule.content[0].rules.map((ival, i) => {
                                                return (
                                                    <div key={i}>
                                                        {ival.annotations.summary && (
                                                            <strong>
                                                                <p> <span style={{ borderRadius: '50%', backgroundColor: '#80808052', width: '100%' }} className="alert-rule-content">{i + 1}</span> {ival.annotations.summary.split(" (")[0]}</p>
                                                            </strong>
                                                        )}
                                                        <div style={{ marginLeft: '30px' }}>
                                                            {ival.annotations.description && (
                                                                <p>{ival.annotations.description.split("\n")[0]}</p>
                                                            )}
                                                            <pre className="alert-rule-content">
                                                                <button
                                                                    style={{ position: "absolute", right: '25px' }}
                                                                    onClick={() => navigator.clipboard.writeText(yaml.dump(ival))}
                                                                >
                                                                    ❐ Copy
                                                                </button>
                                                                {yaml.dump(ival)}
                                                            </pre>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))
                                ) : (
                                    <p>Loading alert rules...</p>
                                )}
                            </div>
                        </div>
                    </div>

                )}

            </div>
        );
    }
}

export default PrometheusAlert;
