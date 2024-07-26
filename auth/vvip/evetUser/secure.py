# Python3 implementation for Custom
# Encryption and Decryption of String
from math import ceil,floor,sqrt

# Function to encrypt the
def encryption(s):
	l = len(s)
	b = ceil(sqrt(l))
	a = floor(sqrt(l))
	encrypted=""
	if (b * a < l):
		if (min(b, a) == b):
			b = b + 1
		else:
			a = a + 1

	# Matrix to generate the
	# Encrypted String
	arr = [[' ' for i in range(a)] for j in range(b)]
	k = 0

	# Fill the matrix row-wise
	for j in range(a):
		for i in range(b):
			if (k < l):
				arr[j][i] = s[k]
			k += 1

	# Loop to generate
	# encrypted
	for j in range(b):
		for i in range(a):
			encrypted = encrypted + arr[i][j]

	return encrypted

# Function to decrypt the
def decryption(s):
	l = len(s)
	b = ceil(sqrt(l))
	a = floor(sqrt(l))
	decrypted=""

	# Matrix to generate the
	# Encrypted String
	arr = [[' ' for i in range(a)] for j in range(b)]
	k = 0

	# Fill the matrix column-wise
	for j in range(b):
		for i in range(a):
			if (k < l):
				arr[j][i] = s[k]
			k += 1

	# Loop to generate
	# decrypted
	for j in range(a):
		for i in range(b):
			decrypted = decrypted + arr[i][j]
	return decrypted


