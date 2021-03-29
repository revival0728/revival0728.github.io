#define endl '\n'
#define IO cin.tie(0), ios_base::sync_with_stdio(0)

template<class T>
istream& operator>>(istream& is, vector<T>& vt) {
	for(auto& i : vt)
		is >> i;
	return is;
}
template<class T, unsigned int N>
istream& operator>>(istream& is, array<T, N>& ary) {
	for(auto& i : ary)
		is >> i;
	return is;
}
template<class T1, class T2>
istream& operator>>(istream& is, pair<T1, T2> pr) {
	is >> pr.first >> pr.second;
	return is;
}
template<class T> void read(T& x) {
	cin >> x;
	cin.get();
}
template<class T, class ... P> void read(T& x, P& ... t) {
	cin >> x;
	read(t...);
}
template<class T> void readl(T& x) { // readline
	getline(cin, x);
}
template<class T, class ... P> void readl(T& x, P& ... t) {
	getline(cin, x);
	readl(t...);
}

template<class T> void write(T x) {
	cout << x;
}
template<class T, class ... P> void write(T x, P ... t) {
	cout << x;
	write(t...);
}
void print() { cout << '\n'; }
template<class T> void print(T x) {
	cout << x << '\n';
}
template<class T, class ... P> void print(T x, P ... t) {
	cout << x << ' ';
	print(t...);
}
