#define endl '\n'
#define IO cin.tie(0), ios_base::sync_with_stdio(0)

template<class T> void read(T& x) {
	cin >> x;
	cin.get();
}
template<class T, class ... P> void read(T& x, P& ... t) {
	cin >> x;
	read(t...);
}
template<class T> void readc(T& c) { // readcontainer
	for(auto& i : c)
		cin >> i;
	cin.get();
}
template<class T, class ... P> void readc(T& c, P& ... t) {
	for(auto& i : c)
		cin >> i;
	readc(t...);
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