function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-sm text-gray-500 font-medium">
            © {new Date().getFullYear()} Hayden Henderson. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
