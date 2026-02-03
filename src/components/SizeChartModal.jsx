export default function SizeChart({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl w-[90%] max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl">
                    X
                </button>
                <h2 className="text-lg font-bold mb-4 text-center">
                    Size Chart
                </h2>

                <table className="w-full border text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Size</th>
                            <th className="border p-2">Chest (in)</th>
                            <th className="border p-2">Shoulder (in)</th>
                            <th className="border p-2">Waist (in)</th>
                            <th className="border p-2">Hips (in)</th>
                            <th className="border p-2">Length (in)</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="text-center">
                            <td className="border p-2">S</td>
                            <td className="border p-2">38</td>
                            <td className="border p-2">16</td>
                            <td className="border p-2">30</td>
                            <td className="border p-2">36</td>
                            <td className="border p-2">26</td>
                        </tr>

                        <tr className="text-center">
                            <td className="border p-2">M</td>
                            <td className="border p-2">40</td>
                            <td className="border p-2">17</td>
                            <td className="border p-2">32</td>
                            <td className="border p-2">38</td>
                            <td className="border p-2">27</td>
                        </tr>

                        <tr className="text-center">
                            <td className="border p-2">L</td>
                            <td className="border p-2">42</td>
                            <td className="border p-2">18</td>
                            <td className="border p-2">34</td>
                            <td className="border p-2">40</td>
                            <td className="border p-2">28</td>
                        </tr>

                        <tr className="text-center">
                            <td className="border p-2">XL</td>
                            <td className="border p-2">44</td>
                            <td className="border p-2">19</td>
                            <td className="border p-2">36</td>
                            <td className="border p-2">42</td>
                            <td className="border p-2">29</td>
                        </tr>

                        <tr className="text-center">
                            <td className="border p-2">XXL</td>
                            <td className="border p-2">46</td>
                            <td className="border p-2">20</td>
                            <td className="border p-2">38</td>
                            <td className="border p-2">44</td>
                            <td className="border p-2">30</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}