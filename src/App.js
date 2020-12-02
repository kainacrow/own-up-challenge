import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

export default class App extends Component {

    state = {
        loading: false,
        loanSize: '',
        creditScore: '',
        propertyType: '',
        occupancy: '',
        quotes: {
            lenderName: {
                value: '',
            },
            loanType: {
                value: '',
            },
            interestRate: {
                value: '',
            },
            closingCosts: {
                value: '',
            },
            monthlyPayment: {
                value: '',
            },
            apr: {
                value: '',
            },
        }
    }

    handleFormChange = (e) => {
    }

    async componentDidMount() {
        this.handleFormChange = this.handleFormChange.bind(this)

        const key = 'OU-AUTH ' + process.env.REACT_APP_API_KEY;
        const url = new URL('https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes');
        url.search = new URLSearchParams(window.location.search);
        const urlParams = new URLSearchParams(window.location.search);
        const params = {
            loanSize: urlParams.get('loanSize'),
            creditScore: urlParams.get('creditScore'),
            propertyType: urlParams.get('propertyType'),
            occupancy: urlParams.get('occupancy') }
        const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: key,
                },
            }
        )
        const data = await response.json();
        if(data.rateQuotes) {
            this.setState({
                apr: data.rateQuotes.map(a => a.apr),
                params: params,
                quotes: data.rateQuotes,
            })
        }
    }
    render() {
        const rows = []
        for(var i=0; i<this.state.quotes.length; i++) {
            rows.push(this.state.quotes[i])
        }
        return (
            <form onChange={this.handleFormChange}>
                <FormControl style={ {marginRight: 100, marginLeft: 100, marginBottom: 200, width: 100} }>
                    <InputLabel>
                        Loan Size:
                        <TextField
                            type="number"
                            name="loanSize"
                        />
                    </InputLabel>
                </FormControl>
                <FormControl style={ {marginRight: 100, marginLeft: 100, marginBottom: 200, width: 100} }>
                    <InputLabel>
                        Credit Score:
                        <TextField
                            type="number"
                            name="creditScore"
                            InputProps={{
                                inputProps: {
                                    max: 800, min: 300
                                }
                            }}
                        />
                    </InputLabel>
                </FormControl>
                <FormControl style={ {marginRight: 100, marginLeft: 100, marginBottom: 200} }>
                    <InputLabel>
                        Property Type:
                        <Select
                            name="propertyType"
                            style={ {width: 120} }
                        >
                            <MenuItem value={'SingleFamily'}>SingleFamily</MenuItem>
                            <MenuItem value={'Condo'} id>Condo</MenuItem>
                            <MenuItem value={'Townhouse'}>Townhouse</MenuItem>
                            <MenuItem value={'MultiFamily'}>MultiFamily</MenuItem>
                        </Select>
                    </InputLabel>
                </FormControl>
                <FormControl style={ {marginRight: 100, marginLeft: 100} }>
                    <InputLabel>
                        Occupancy:
                        <Select
                            name="occupancy"
                            style={ {width: 150} }
                        >
                            <MenuItem value={'Primary'}>Primary</MenuItem>
                            <MenuItem value={'Secondary'}>Secondary</MenuItem>
                            <MenuItem value={'Investment'}>Investment</MenuItem>
                        </Select>
                    </InputLabel>
                </FormControl>
                <div>
                    <FormControl style={ {marginLeft: 100, marginBottom: 100} }>
                        <input type="submit" value="Submit" />
                    </FormControl>
                </div>

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Lender Name</TableCell>
                                <TableCell align="right">Loan Type</TableCell>
                                <TableCell align="right">Interest Rate</TableCell>
                                <TableCell align="right">Closing Costs</TableCell>
                                <TableCell align="right">Monthly Payment</TableCell>
                                <TableCell align="right">APR</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow>
                                    <TableCell align="right">{row.lenderName}</TableCell>
                                    <TableCell align="right">{row.loanType}</TableCell>
                                    <TableCell align="right">{parseFloat(row.interestRate).toFixed(3) + '%'}</TableCell>
                                    <TableCell align="right">{'$' + parseFloat(row.closingCosts).toFixed(2)}</TableCell>
                                    <TableCell align="right">{'$' + parseFloat(row.monthlyPayment).toFixed(2)}</TableCell>
                                    <TableCell align="right">{parseFloat(row.apr).toFixed(3) + '%'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
        )};
    }

// export default App;
