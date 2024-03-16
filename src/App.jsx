import { useState, useCallback, useEffect, useRef } from "react";

function App() {
	const [length, setLength] = useState(8);
	const [numberAllowed, setNumberAllowed] = useState(false);
	const [charAllowed, setCharAllowed] = useState(false);
	const [password, setPassword] = useState("");
	const passwordRef = useRef(null);
	const [hyphensAllowed, setHyphens] = useState(false);

	const passwordGenerator = useCallback(() => {
		let myPassword = "";
		let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		if (numberAllowed) {
			string += "0123456789";
		}
		if (charAllowed) {
			string += "!@#$%^&*-_+=~`";
		}
		if (hyphensAllowed) {
			string += "-------------";
		}

		for (let i = 1; i <= length; i++) {
			let char = Math.floor(Math.random() * string.length + 1);
			myPassword += string[char];
		}

		setPassword(myPassword);
	}, [length, numberAllowed, charAllowed, hyphensAllowed, setPassword]);

	const copyPasswordToClipboard = useCallback(() => {
		passwordRef.current?.select();
		passwordRef.current?.setSelectionRange(0, 999);
		window.navigator.clipboard.writeText(password);
	}, [password]);

	useEffect(() => {
		passwordGenerator();
	}, [length, numberAllowed, charAllowed, passwordGenerator]);

	return (
		<>
			<div className="flex justify-center items-center w-full h-screen bg-gray-300">
				<div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-4 py-4 h-48 bg-gray-800 text-orange-500">
					<h1 className=" text-center my-3 font-bold text-3xl underline ">
						Password Generator
					</h1>
					<div className="flex shadow rounded-lg overflow-hidden mb-4 pt-3">
						<input
							type="text"
							value={password}
							className="outline-none w-full py-1 px-3"
							placeholder="Password"
							readOnly
							ref={passwordRef}
						/>
						<button
							onClick={copyPasswordToClipboard}
							className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer hover:bg-blue-600 active:bg-blue-700"
						>
							copy
						</button>
					</div>
					<div className="flex text-sm gap-x-2">
						<div className="flex items-center gap-x-1">
							<input
								type="range"
								min={6}
								max={32}
								value={length}
								className="cursor-pointer"
								onChange={(e) => {
									setLength(e.target.value);
								}}
							/>
							<label>Length: {length}</label>
						</div>
						<div className="flex items-center gap-x-1">
							<input
								type="checkbox"
								defaultChecked={numberAllowed}
								id="numberInput"
								onChange={() => {
									setNumberAllowed((previousValue) => {
										return !previousValue;
									});
								}}
							/>
							<label htmlFor="numberInput">Numbers</label>
						</div>
						<div className="flex items-center gap-x-1">
							<input
								type="checkbox"
								defaultChecked={charAllowed}
								id="characterInput"
								onChange={() => {
									setCharAllowed((previousValue) => {
										return !previousValue;
									});
								}}
							/>
							<label>Characters</label>
						</div>
						<div className="flex items-center gap-x-1">
							<input
								type="checkbox"
								defaultChecked={hyphensAllowed}
								id="Hyphen"
								onChange={() => {
									setHyphens((previousValue) => {
										return !previousValue;
									});
								}}
							/>
							<label>Only Hyphens</label>
						</div>
					</div>
					<div className="absolute bottom-0 right-0 bg-slate-700 px-3 py-1 font-bold rounded-sm">
						code-with-alpha
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
